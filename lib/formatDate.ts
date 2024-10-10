export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // 無効な日付のチェック
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
}
