// useSystemStatus - Real-time performance monitoring for HUD display

import { useState, useEffect, useRef } from 'react';

interface SystemStatus {
  fps: number;
  memory: number | null; // MB, Chrome only
  connection: 'ONLINE' | 'OFFLINE' | 'SLOW';
  status: 'NOMINAL' | 'DEGRADED' | 'CRITICAL';
}

export const useSystemStatus = (): SystemStatus => {
  const [status, setStatus] = useState<SystemStatus>({
    fps: 60,
    memory: null,
    connection: 'ONLINE',
    status: 'NOMINAL',
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // FPS calculation using requestAnimationFrame
    const measureFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      // Update FPS every second
      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        // Get memory if available (Chrome only)
        let memory: number | null = null;
        if ((performance as any).memory) {
          memory = Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024));
        }

        // Determine connection status
        let connection: 'ONLINE' | 'OFFLINE' | 'SLOW' = 'ONLINE';
        if (!navigator.onLine) {
          connection = 'OFFLINE';
        } else if ((navigator as any).connection) {
          const conn = (navigator as any).connection;
          if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
            connection = 'SLOW';
          }
        }

        // Determine overall status
        let overallStatus: 'NOMINAL' | 'DEGRADED' | 'CRITICAL' = 'NOMINAL';
        if (connection === 'OFFLINE') {
          overallStatus = 'CRITICAL';
        } else if (fps < 30 || connection === 'SLOW') {
          overallStatus = 'DEGRADED';
        }

        setStatus({
          fps,
          memory,
          connection,
          status: overallStatus,
        });
      }

      rafIdRef.current = requestAnimationFrame(measureFPS);
    };

    rafIdRef.current = requestAnimationFrame(measureFPS);

    // Listen for online/offline events
    const handleOnline = () => setStatus(s => ({ ...s, connection: 'ONLINE' }));
    const handleOffline = () => setStatus(s => ({ ...s, connection: 'OFFLINE', status: 'CRITICAL' }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};
