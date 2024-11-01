import { useEffect, useRef } from "react";

// 채팅 신고 컴포넌트 -> 상대방의 메시지를 누르거나 멤버 목록에서 상대 누르면 나옴
export default function ChatReport() {
  const reportRef = useRef<HTMLDivElement>(null);
  
  const handleReport = async () => {
    
  }

  useEffect(()=> {
    const handleClickOutside = (e:MouseEvent | TouchEvent) => {
      if(reportRef.current && !reportRef.current.contains(e.target as Node)){
        // 모달 닫히는 로직 추가
      }
    }

    // 모달이 열려있는 상태인지 확인 필요
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchend', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [])

  return (
    <div className="chat-report" ref={reportRef}>
      <ul>
        <li>차단</li>
        <li onClick={handleReport}>신고</li>
        {/* 모임장만 할 수 있도록 해야함 */}
        <li>내보내기</li>
      </ul>
    </div>
  )
}
