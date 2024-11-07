import { ChatRoomMemberInfo } from '../../types/chat';
import { ReactComponent as Crown } from '../../assets/crown.svg';
import '../../styles/chat/ChatMember.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

interface ChatMemberProp {
  member: ChatRoomMemberInfo;
}

export default function ChatMember({ member }: ChatMemberProp) {
  const { chatroom } = useSelector((state: RootState) => state.chat);
  const userId = Number(extractUserIdFromCookie());

  return (
    <li className="chatmember-list">
      <figure className="chatmember-img">
        {member.userId === chatroom?.meetingHeader ? <Crown /> : null}
        <img
          src={member.profileImg ? member.profileImg : '/images/usericon.png'}
          alt="프로필 이미지"
        />
      </figure>
      <div className="chatmember-name">
        {member.userId === userId ? <span className="me">나</span> : null}
        <span>{member.nickname}</span>
      </div>
    </li>
  );
}
