// ContentSection Controller - Tab state management with staged animations

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  sectionIdFromHash,
  hashFromSectionId,
  isValidSectionHash,
} from '../../utils/hashRouting';
import { sections } from '../../data/sections';

export type TabId = number | null;

export type NavigationType = 'none' | 'home-to-module' | 'module-to-module' | 'module-to-home';

export interface UseTabNavigationReturn {
  activeTab: TabId;
  navigationType: NavigationType;
  sidebarVisible: boolean;
  sidebarExiting: boolean;
  sidebarEntering: boolean;
  contentKey: number;
  clickedCardId: number | null;
  selectTab: (id: number) => void;
  goHome: () => void;
  isTabActive: (id: number) => boolean;
}

// Animation timing constants (in ms)
const SHIMMER_DURATION = 300;
const SIDEBAR_ITEM_EXIT_DURATION = 300;
const WIDTH_TRANSITION_DELAY = 100;

/**
 * Custom hook for managing tab navigation state with staged animations
 * and URL hash synchronization
 */
export const useTabNavigation = (): UseTabNavigationReturn => {
  // Initialize from hash on mount
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    return sectionIdFromHash(window.location.hash);
  });
  const [navigationType, setNavigationType] = useState<NavigationType>('none');
  const [sidebarVisible, setSidebarVisible] = useState(() => {
    return sectionIdFromHash(window.location.hash) !== null;
  });
  const [sidebarExiting, setSidebarExiting] = useState(false);
  const [sidebarEntering, setSidebarEntering] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [clickedCardId, setClickedCardId] = useState<number | null>(null);

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const shouldPushHistoryRef = useRef(true);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
  };

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutRefs.current.push(id);
    return id;
  };

  const selectTab = useCallback((id: number) => {
    clearAllTimeouts();
    setSidebarExiting(false);
    const shouldPush = shouldPushHistoryRef.current;

    if (activeTab === null) {
      // Stage 1: Show shimmer on clicked card
      setClickedCardId(id);
      setNavigationType('home-to-module');

      // Stage 2: After shimmer, start width transition and swap content
      addTimeout(() => {
        setSidebarVisible(true);
        setActiveTab(id);
        setClickedCardId(null);

        // Push hash at the moment content changes
        if (shouldPush) {
          window.history.pushState({ tabId: id }, '', `#${hashFromSectionId(id)}`);
        }

        // Stage 3: After width starts, trigger sidebar item entrance
        addTimeout(() => {
          setSidebarEntering(true);

          // Reset entering state after animation completes
          addTimeout(() => {
            setSidebarEntering(false);
          }, 500);
        }, WIDTH_TRANSITION_DELAY);
      }, SHIMMER_DURATION);
    } else {
      // Navigating between modules - simple swap
      setNavigationType('module-to-module');
      setContentKey(prev => prev + 1);
      setActiveTab(id);

      if (shouldPush) {
        window.history.pushState({ tabId: id }, '', `#${hashFromSectionId(id)}`);
      }
    }

    shouldPushHistoryRef.current = true;
  }, [activeTab]);

  const goHome = useCallback(() => {
    clearAllTimeouts();
    const shouldPush = shouldPushHistoryRef.current;

    setNavigationType('module-to-home');

    // Stage 1: Start sidebar items exit animation
    setSidebarExiting(true);

    // Stage 2: After items exit, collapse sidebar and swap content
    addTimeout(() => {
      setSidebarVisible(false);
      setContentKey(prev => prev + 1);
      setActiveTab(null);

      if (shouldPush) {
        window.history.pushState({ tabId: null }, '', window.location.pathname);
      }

      // Reset exiting state after width transition completes
      addTimeout(() => {
        setSidebarExiting(false);
      }, 500);
    }, SIDEBAR_ITEM_EXIT_DURATION);

    shouldPushHistoryRef.current = true;
  }, []);

  const isTabActive = useCallback(
    (id: number) => activeTab === id,
    [activeTab]
  );

  // Handle browser back/forward
  useEffect(() => {
    const handleNavigation = () => {
      const targetTabId = sectionIdFromHash(window.location.hash);
      if (targetTabId === activeTab) return;

      shouldPushHistoryRef.current = false;

      if (targetTabId === null) {
        goHome();
      } else {
        selectTab(targetTabId);
      }
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, [activeTab, selectTab, goHome]);

  // Clean up invalid hashes on mount
  useEffect(() => {
    if (window.location.hash && !isValidSectionHash(window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Update document title based on active tab
  useEffect(() => {
    if (activeTab === null) {
      document.title = 'Home | Brandon Sabino';
    } else {
      const section = sections.find(s => s.id === activeTab);
      if (section) {
        document.title = `${section.title} | Brandon Sabino`;
      }
    }
  }, [activeTab]);

  return {
    activeTab,
    navigationType,
    sidebarVisible,
    sidebarExiting,
    sidebarEntering,
    contentKey,
    clickedCardId,
    selectTab,
    goHome,
    isTabActive,
  };
};
