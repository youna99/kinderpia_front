import "../styles/common/NavBar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { getJwtFromCookies } from "../utils/extractUserIdFromCookie";

export default function NavBar() {
  const [badge, setBadge] = useState(false);
  const { unreadCounts } = useSelector((state: RootState) => state.chat);
  const { rooms } = useSelector((state: RootState) => state.chatRooms);

  let jwt = getJwtFromCookies();

  useEffect(() => {
    if (!jwt) setBadge(false);
    const hasUnreadMessages = rooms.some(
      (room) => unreadCounts[room.chatroomId] > 0
    );
    setBadge(hasUnreadMessages);
  }, [unreadCounts, rooms, jwt]);

  return (
    <nav className="navigation">
      <ul className="nav-lists">
        <li className="nav-list">
          <Link to={"/"}>
            <span className="xi-home nav-icon"></span>
            <span>홈</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={"/meeting/create"}>
            <span className="xi-users-plus nav-icon"></span>
            <span>모임 생성</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={"/chatroom/list"}>
            <span className="xi-message-o nav-icon"></span>
            {/* {badge ? <span className="chat-badge"></span> : null} */}
            <span>채팅</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={"/mypage"}>
            <span className="xi-profile nav-icon"></span>
            <span>마이페이지</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
