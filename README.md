# 🐰 KINDERPIA

❣ 회원 가입할 때 테스트 계정을 생성하거나, 로그인화면에서 [테스트 유저 계정으로 로그인] 버튼을 누르면
해당 프로젝트를 빠르게 살펴볼 수 있습니다.

[👉 킨더피아 배포링크 바로가기](http://ec2-3-38-150-41.ap-northeast-2.compute.amazonaws.com/)<br/>

[👉 킨더피아 위키 바로가기](https://github.com/SeSAC-3rd-Kinderpia/kinderpia_front/wiki)
<br>

## 👋🏻프로젝트 소개
- **React**와 **Spring Boot** 기반의 어린이 자녀를 둔 부모를 위한 **커뮤니티 플랫폼** <br>
- 부모들이 자녀와 함께 즐길 문화시설 정보를 얻고 가족 모임 생성 및 채팅이 가능 <br>
- **기간**: 2024.10.21 ~ 11.08 (3주) <br>
- **팀 구성**: 백엔드(4명), 프론트엔드 (4명) <br>
- **역할**: **프론트엔드**

## 👩🏻‍🔧프론트엔드 기술 스택
TypeScript, React, SCSS

## 👩🏻‍💻 맡은 기능

### 검색, 필터링(별점, 기본순) 기능
<img src="https://github.com/user-attachments/assets/5f3b6bfb-2e76-4dec-93b9-1ec8572f0ebd" width="700" /> <br>

- 장소 목록 데이터를 패칭하는 **API를 연결**하고 **검색, 필터링** 시 사용자 입력에 따라 **동적으로 데이터를 업데이트**하기 위해 **useEffect** 훅을 사용 <br>
- 데이터 패칭 함수가 **의존성 변화 시** 필요할 때만 생성되도록 **useCallback**을 사용하여 **최적화** <br>
- 장소 정보 타입을 정의하여 **타입 안전성**을 확보 <br>
- **그리드 레이아웃**을 화면 크기에 맞게 변경 <br>

### 리뷰 작성, 삭제, 신고 기능
<img src="https://github.com/user-attachments/assets/4dc0a5dc-45b8-4f11-9f6a-acaee1aa27b3" width="700" /> <br>

- **try-catch-finally** 블록을 이용하여 상태별 사용자 피드백 및 에러 처리를 진행 <br>
- 리뷰를 하나의 컴포넌트로 분리하여 props를 통해 데이터와 삭제 기능을 전달 <br>
- 리뷰 컴포넌트를 재사용할 수 있도록 **조건부 렌더링**을 적용해 기능을 선택적으로 표시할 수 있게 구현 <br>

### 로그인 전 리뷰 작성, 신고 기능 불가
<img src="https://github.com/user-attachments/assets/c8377cb0-c8ba-4c36-9f2d-6bfa6af7e46d" width="700" /> <br>

- **쿠키를 활용해 JWT(JSON Web Token)** 존재 여부를 확인하여 사용자 인증 상태를 관리
- 인증되지 않은 사용자가 기능을 시도할 때 **명확한 안내 메시지 제공**

## 📱모바일 뷰
<div align="center">
  <img src="https://github.com/user-attachments/assets/1d9bf445-2935-4eae-ae1d-5cdd96d4a78d" width="200"/> &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/fe3d4b60-b274-4ac1-963b-8b385904509c" width="200"/> &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/bc4ab61b-0031-44db-952f-0995266fd4ab" width="200"/> &nbsp;&nbsp; <br>
</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/93fc2ca9-efd4-49b1-9dde-e5d618ac9685" width="200"/> &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/edc104c9-dd37-4fd1-8901-e74614c637f7" width="200"/> &nbsp;&nbsp;
</div>
