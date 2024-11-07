import '../../styles/chat/ChatHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ChatMembersMenu from './ChatMembersMenu';
import { setOpen } from '../../store/chatSlice';

// 채팅방 헤더 컴포넌트 - 뒤로가기, 채팅방 제목, 채팅방 멤버보기
export default function ChatHeader() {
  const dispatch = useDispatch();

  const { chatroom } = useSelector((state: RootState) => state.chat);

  if (!chatroom) return <div>채팅방 정보 불러오는 중</div>;

  const { meetingTitle } = chatroom;

  const openMenu = () => {
    dispatch(setOpen(true));
  };

  return (
    <div className="chat-header">
      <div className="chat-header__container">
        {/* 뒤로가기 */}
        <div className="chat-header__column"></div>
        {/* 채팅방 제목 */}
        <div className="chat-header__column">
          <h2 className="chat-title">{meetingTitle}</h2>
        </div>
        {/* 채팅방 정보 보기 버튼 */}
        <div className="chat-header__column">
          <button onClick={openMenu}>
            <i className="xi-info-o"></i>
          </button>
        </div>
      </div>
      <ChatMembersMenu />
    </div>
  );
}
