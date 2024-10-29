import { ChatRoomMemberInfo } from '../../types/chat'
import '../../styles/chat/ChatMember.scss'

interface ChatMemberProp {
  member : ChatRoomMemberInfo;
}

export default function ChatMember({member} : ChatMemberProp) {
  return (
    <li className='chatmember-list'>
      <figure className='chatmember-img'>
        <img src={member.profileImg} alt="프로필 이미지" />
      </figure>
      <div className='chatmember-name'>{member.username}</div>
    </li>
  )
}
