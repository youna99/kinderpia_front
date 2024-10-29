import { Link } from "react-router-dom";

export default function NoChatRoom() {
  return (
    <div>
      <div><span className="xi-message"></span></div>
      <div>참여한 모임이 없습니다.</div>
      <Link to={'/meeting'}>모임 찾으러 가기</Link>
    </div>
  )
}
