// alert.ts
import Swal from 'sweetalert2';

export const simpleAlert = async (
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  title: string,
  position:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end' = 'center'
) => {
  await Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      container: 'my-swal-container', // 사용자 정의 클래스 사용
    },
  });
};

export const showAlert = async (
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  title: string,
  position:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end' = 'center',
  text?: string
) => {
  const result = await Swal.fire({
    icon,
    title,
    position,
    text,
    confirmButtonText: '확인',
    confirmButtonColor: '#59a4d6',
    customClass: {
      container: 'my-swal-container', // 사용자 정의 클래스 사용
    },
  });
  return result.isConfirmed;
};

export const confirmAlert = async (
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  title: string,
  text?: string
) => {
  const result = await Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: '#59a4d6',
    cancelButtonColor: '#777',
    confirmButtonText: '예',
    cancelButtonText: '아니요',
  });
  return result.isConfirmed;
};

// icon : success, error, warning, info, question

//사용 예시

// 1.확인버튼 없이 자동으로 사라짐
// simpleAlert('success', '로그인 성공!');

// 2.확인 버튼이 있는 경고 메시지
// showAlert('success', '로그인 성공!');
// 또는
// showAlert('success', '로그인 성공!', 'center', '환영합니다!');

// 3.확인과 취소 버튼이 있는 경고 메시지
// const handleDelete = async () => {
//   const confirmed = await confirmAlert('warning', '정말 삭제하시겠습니까?');

//   if (confirmed) {
//     console.log('삭제가 확인되었습니다.');
//     // 삭제 작업 수행
//   } else {
//     console.log('삭제가 취소되었습니다.');
//   }
// };
