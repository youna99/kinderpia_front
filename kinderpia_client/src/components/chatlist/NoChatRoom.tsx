import { Link } from "react-router-dom";
import { ReactComponent as ChatIcon } from "../../assets/icons-chat.svg";
import '../../styles/chatlist/NoChatRoom.scss'

export default function NoChatRoom() {
  return (
    <section className="nochatroom">
      <div><ChatIcon /></div>
      <div className="nochatroom-text">참여한 모임이 없습니다.</div>
      <Link to={'/meeting'}>모임 찾으러 가기</Link>
    </section>
  )
}
