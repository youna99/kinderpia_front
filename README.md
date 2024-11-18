<div align="center">
  <h1>🧒 킨더피아 🐇</h1>
</div>

![킨더피아](https://github.com/user-attachments/assets/33ea9cdb-dc36-4684-bf3c-b78a116bc72c)

<div align="center">
  <strong>👨‍👩‍👧‍👦 부모와 아이들이 함께할 공간을 소개하며,<br> 🗨 모임을 만들어 함께 할 수 있는 웹 사이트</strong>
</div>

<br>

## 📢 1. 서비스 소개

킨더피아는 '킨더(Kindergarten)'와 '유토피아(Utopia)'의 합성어로,
부모와 아이가 함께하는 이상적인 문화생활 플랫폼입니다.

현대 사회에서 바쁜 부모들이 자녀와 질 높은 시간을 보내기 어려운 점에 착안하여 기획되었습니다. 다양한 놀이시설, 박물관, 키즈카페 등의 정보를 제공하고, 같은 관심사를 가진 가족들이 모임을 만들 수 있는 기회를 제공합니다.

<br>

## 🙋 2. Front-End Developers

#### 강예나 [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/yenaf)

- 회원 관리 기능(회원가입, 로그인, 프로필 관리 등), 튜토리얼 기능

#### 이다인 [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/DAIN302)

- 웹 소켓을 이용한 실시간 채팅

#### 양태완 [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/behindy3359)

- 모임 기능, 지도 기능, 관리자 페이지

#### 이유나 [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/youna99)

- 장소 조회/검색, 리뷰 작성/삭제/신고

<br>

## 📅 3. 개발일정

🗓️ 기간 : 2024.10.21 (월) ~ 11.08 (금)

- Jira를 활용한 체계적인 일정 관리와 효율적인 작업 분배
- 원활한 커뮤니케이션을 통한 프로젝트 진행 상황 실시간 공유

![개발일정](https://github.com/user-attachments/assets/036c4b70-714e-411b-b130-f6c007d87b01)

<br>

## ⚙️ 4. 기술 스택

- 클라이언트 앱

  언어 : TypeScript

  프레임워크 : React.js

  스타일 : Sass

  라이브러리 : sweetalert2, react-calendar, sockjs-client, react-joyride, react-redux

- 관리자 앱

  언어 : TypeScript

  프레임워크 : React.js

  스타일 : tailwindcss, sass

  라이브러리 : react-chartjs-2

- Naver API 통신용 Express.js 서버

  언어 : TypeScript

  프레임워크 : Express.js

## 📂 5. 프로젝트 폴더 구조

```
📂src/
├── 📂api/           # Axios 인스턴스 및 API 관련 함수
├── 📂assets/        # 아이콘, 이미지 등 정적 리소스
├── 📂components/    # 컴포넌트 모음
│  ├─ 📂 common ─────────── 📦 공통 컴포넌트
│  ├─ 📂 chat ───────────── 📦 채팅기능에서 사용되는 컴포넌트
│  ├─ 📂 chatlist ───────── 📦 채팅방 목록을 보여주기 위해서 사용되는 컴포넌트
│  ├─ 📂 meeting ────────── 📦 모임기능 페이지에서 사용되는 컴포넌트
│  ├─ 📂 mypage ─────────── 📦 마이 페이지에서 사용되는 컴포넌트
│  ├─ 📂 place ──────────── 📦 장소기능 페이지에서 사용되는 컴포넌트
│  └─ 📂 review ─────────── 📦 장소상세 페이지에서 리뷰 기능에 사용되는 컴포넌트
├── 📂data/          # 사이트 이용약관 & 개발단계에서 활용한 더미데이터 모음
├── 📂hooks/         # 커스텀 훅 모음
├── 📂layout/        # 공통 레이아웃 모음
├── 📂pages/         # 페이지 모음
│  ├─ 📂 meeting ────────── 📦 모임기능 페이지 모음
│  ├─ 📂 mypage ─────────── 📦 마이페이지 페이지 모음
├── 📂store/         # 유틸리티 함수
├── 📂styles/        # 스타일 모음
│  ├─ 📂 common ─────────── 📦 공통 스타일
│  │  ├─ _reset.scss ─────── 브라우저의 기본 스타일을 초기화하고 일관된 스타일 기반을 제공
│  │  ├─ _utils.scss ─────── 전역적으로 사용되는 기본 스타일과 유틸리티 믹스인을 정의
│  │  └─ _variables.scss ─── 프로젝트 전반에서 사용되는 글로벌 변수들을 정의
│  ├─ 📂 chat ───────────── 📦 채팅기능에서 사용되는 스타일
│  ├─ 📂 chatlist ───────── 📦 채팅방 목록을 보여주기 위해서 사용되는 스타일
│  ├─ 📂 meeting ────────── 📦 모임기능 페이지에서 사용되는 스타일
│  ├─ 📂 mypage ─────────── 📦 마이 페이지에서 사용되는 스타일
│  ├─ 📂 place ──────────── 📦 장소기능 페이지에서 사용되는 스타일
│  └─ 📂 review ─────────── 📦 장소상세 페이지에서 리뷰 기능에 사용되는 스타일
├── 📂types/         # TypeScript에 활용되는 Type,interface 모음
└── 📂utils/         # 공통으로 사용되는 유틸 함수 모음
app.tsx              # React-Route모음

```

## 😀 6. Use Case(유스케이스)

<p align="center">
  <img src="https://github.com/user-attachments/assets/14bda5ae-c54c-4891-96c9-c145ef7b9054" width="500" height="auto" alt="유스케이스 다이어그램">
</p>

## 🏷️ 7. 기능 소개

### 0) 메인 페이지

| 시작 화면                                                                                                                                       | 온보딩 튜토리얼                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/user-attachments/assets/3332690a-2a31-413f-9a6c-6606b412eb72" width="243" height="auto" alt="메인페이지 시작화면"> | <img src="https://github.com/user-attachments/assets/c110df9e-f7c5-43fe-95f7-8d53225f6b1f" width="243" height="auto" alt="메인페이지 온보딩 튜토리얼"> |

### 1) 회원기능

| 회원가입 페이지                                                                                                                             | 로그인 페이지                                                                                                                             | 마이페이지                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/4c0734b2-19c6-45fa-b7fe-0073d38a0d9d" width="243" height="auto" alt="회원가입 페이지"> | <img src="https://github.com/user-attachments/assets/646bd240-8742-4e46-a917-997d7ce949f4" width="243" height="auto" alt="로그인 페이지"> | <img src="https://github.com/user-attachments/assets/2c91a558-3ec1-4ab7-b906-c4e1f2db4764" width="243" height="auto" alt="마이페이지"> |

### 2) 장소기능

| 장소 검색                                                                                                                              | 장소 상세조회                                                                                                                              | 리뷰 작성/관리                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/695a0e93-0dca-4084-8dba-0c37771e13e8"  width="243" height="auto" alt="장소 검색"> | <img src="https://github.com/user-attachments/assets/d623c84b-39bc-4f5a-98ae-7cdff044d1db"  width="243" height="auto" alt="장소 상세조회"> | <img src="https://github.com/user-attachments/assets/57b711b9-45a0-4f35-a0f2-0717c9162b61"  width="243" height="auto" alt="리뷰작성관리"> |

### 3) 모임기능

| 모임 검색                                                                                                                                 | 모임 생성                                                                                                                                 | 모임 참여                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/d2c0adb0-dfdf-4fad-93e6-e9be9e252770"  width="243" height="auto" alt="리뷰작성관리"> | <img src="https://github.com/user-attachments/assets/4d29f7df-13ef-4c6b-85d1-e539535e29f5"  width="243" height="auto" alt="리뷰작성관리"> | <img src="https://github.com/user-attachments/assets/94873c45-a95a-440f-abba-fca146317e69"  width="243" height="auto" alt="리뷰작성관리"> |

| 모임 수정/관리                                                                                                                            | 채팅                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/befd81e7-e986-4708-a297-cca1c5ea76e5"  width="243" height="auto" alt="리뷰작성관리"> | <img src="https://github.com/user-attachments/assets/addd56ea-f22b-4273-8250-7246e3eb811f"  width="243" height="auto" alt="리뷰작성관리"> |

### 3) 관리자 기능

| 관리자 메인                                                                                   | 회원 통계                                                                                     |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![adminmain](https://github.com/user-attachments/assets/dc4c2712-e497-4abb-a3bd-1aa77238b3aa) | ![adminuser](https://github.com/user-attachments/assets/c435a81e-e2ff-4ac1-9e1d-f018fd98fdd5) |

| 모임 통계                                                                                        | 신고 조회                                                                                       |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| ![adminmeeting](https://github.com/user-attachments/assets/92aa4380-6008-48b4-a4ab-a231b4baf005) | ![adminreport](https://github.com/user-attachments/assets/a4def0d7-5ea3-4a62-b011-de689511273c) |
