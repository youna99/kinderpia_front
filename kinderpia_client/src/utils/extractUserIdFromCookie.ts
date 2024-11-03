function getJwtFromCookies() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    if (cookie.startsWith('jwt=')) {
      return cookie.split('=')[1];
    }
  }
  return null; // JWT가 없을 경우 null 반환
}

export const extractUserIdFromCookie = (): string | null => {
  const jwt = getJwtFromCookies();
  if (!jwt) return null;

  try {
    const payload = jwt.split('.')[1]; // 페이로드 부분 가져오기
    const decodedPayload = JSON.parse(atob(payload)); // Base64 디코딩 후 JSON으로 변환
    return decodedPayload.sub; // 사용자 ID로 사용할 필드
  } catch (error) {
    console.error('토큰에서 사용자 ID 추출 중 오류 발생:', error);
    return null;
  }
};
