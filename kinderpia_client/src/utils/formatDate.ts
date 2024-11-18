export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function formatDetailDate(dateString: string): string {
  const date = new Date(dateString);

  // 올바른 옵션 타입으로 수정
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit' as const,
    day: '2-digit' as const,
    weekday: 'short' as const,
  };

  // 날짜 형식 변환
  const formattedDate = date.toLocaleDateString('ko-KR', options);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';
  const formattedTime = `${period} ${hours % 12 || 12}:${minutes}`; // "오후 5:00" 형식

  return `${formattedDate}  ${formattedTime}`;
}
