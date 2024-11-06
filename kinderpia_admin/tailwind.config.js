/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // src 폴더 내의 모든 JS/TS 파일들을 스캔
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 색상이 필요하다면 여기에 추가
        primary: '#1e2532',  // 사이드바 배경색
      }
    },
  },
  plugins: [],
}