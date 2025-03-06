// hooks/useDeviceSize.ts
import { useState, useEffect } from 'react';

// デバイスタイプを定義
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// ブレークポイントをプロジェクトの設計に合わせて調整
const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024
};

export default function useDeviceSize() {
  // デフォルトで画面サイズが不明なときはdesktopとみなす
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // サーバーサイドレンダリング対策
    if (typeof window === 'undefined') return;

    function handleResize() {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setHeight(window.innerHeight);

      if (currentWidth < BREAKPOINTS.tablet) {
        setDeviceType('mobile');
      } else if (currentWidth < BREAKPOINTS.desktop) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    }

    // 初期化時に一度実行
    handleResize();

    // リサイズイベントリスナーの登録
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    deviceType,
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  };
}
