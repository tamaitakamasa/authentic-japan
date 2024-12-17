'use client';

import { debounce } from '@/lib/debounce';
import { useEffect } from 'react';

export function ScrollBarWidthManager() {
  useEffect(() => {
    const updateScrollBarWidth = () => {
			// chomedevtoolでのスクロールバーの幅が正しく取れないので、別のアプローチに変更
      // スクロールバー計測用の要素を作成
      const outer = document.createElement('div');
      const inner = document.createElement('div');

      // 外側の要素のスタイル
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // スクロールバーを強制的に表示

      // 要素をDOMに追加
      document.body.appendChild(outer);
      outer.appendChild(inner);

      // スクロールバーの幅を計算
      const scrollBarWidth = outer.offsetWidth - inner.offsetWidth;

      // 計測用の要素を削除
      document.body.removeChild(outer);

      // 計算した幅が妥当な範囲内かチェック（0-50px）
      const validWidth = scrollBarWidth >= 0 && scrollBarWidth <= 50
        ? scrollBarWidth
        : 0;

			// console.log('scrollBarWidth:', scrollBarWidth);

      // CSSカスタムプロパティに設定
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${validWidth}px`
      );
    };

    // 初期化時に実行
    updateScrollBarWidth();

    // リサイズ時のイベントハンドラを設定
    const debouncedUpdateScrollBarWidth = debounce(updateScrollBarWidth, 200);
    window.addEventListener('resize', debouncedUpdateScrollBarWidth);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', debouncedUpdateScrollBarWidth);
    };
  }, []);

  return null;
}
