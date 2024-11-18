/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // src 폴더 내의 모든 JS/TS 파일들을 스캔
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e2532',  // 사이드바 배경색
      },
      fontFamily: {
        'jeju': ['EF_jejudoldam', 'sans-serif'],
        'gmarket': ['GmarketSansMedium', 'sans-serif'],
        'tenada': ['Tenada', 'sans-serif'],
      },
    },
  },
  plugins: [],
}