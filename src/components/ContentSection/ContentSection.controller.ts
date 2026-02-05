// ContentSection Controller - Tab state management with staged animations

import { useState, useCallback, useRef } from 'react';

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
 */
export const useTabNavigation = (): UseTabNavigationReturn => {
  const [activeTab, setActiveTab] = useState<TabId>(null);
  const [navigationType, setNavigationType] = useState<NavigationType>('none');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarExiting, setSidebarExiting] = useState(false);
  const [sidebarEntering, setSidebarEntering] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [clickedCardId, setClickedCardId] = useState<number | null>(null);

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

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


    if (activeTab === null) {
      // Stage 1: Show shimmer on clicked card
      setClickedCardId(id);
      setNavigationType('home-to-module');

      // Stage 2: After shimmer, start width transition and swap content
      addTimeout(() => {
        setSidebarVisible(true);
        setActiveTab(id);
        setClickedCardId(null);

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
    }
  }, [activeTab]);

  const goHome = useCallback(() => {
    clearAllTimeouts();

    setNavigationType('module-to-home');

    // Stage 1: Start sidebar items exit animation
    setSidebarExiting(true);

    // Stage 2: After items exit, collapse sidebar and swap content
    addTimeout(() => {
      setSidebarVisible(false);
      setContentKey(prev => prev + 1);
      setActiveTab(null);

      // Reset exiting state after width transition completes
      addTimeout(() => {
        setSidebarExiting(false);
      }, 500);
    }, SIDEBAR_ITEM_EXIT_DURATION);
  }, [activeTab]);

  const isTabActive = useCallback(
    (id: number) => activeTab === id,
    [activeTab]
  );

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
