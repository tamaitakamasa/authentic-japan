/**
 * 指定された遅延時間後に関数を実行するdebounce関数
 * @param callback 実行する関数
 * @param delay 遅延時間（ミリ秒）
 * @returns debounceされた関数
 */
export const debounce = <T extends unknown[], R>(callback: (...args: T) => R, delay: number = 0): ((...args: T) => void) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: T): void => {
			if (timeoutId) {
					clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
					callback(...args);
			}, delay);
	};
};
