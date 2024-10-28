import '../../styles/chat/ChatContainer.scss'
import ChatMessage from './ChatMessage'

// 채팅방 메시지 컨테이너 컴포넌트
export default function ChatContainer() {
  // 내가 보낸 메시지, 다른 사람이 보낸 메시지 구분 필요 -> sender로 하기
  return (
    <div className='chat-container'>
      <ChatMessage sender={'own'}/>
      <ChatMessage sender={'other'}/>
      <ChatMessage sender={'own'}/>
      <ChatMessage sender={'other'}/>
      <ChatMessage sender={'own'}/>
    </div>
  )
}
