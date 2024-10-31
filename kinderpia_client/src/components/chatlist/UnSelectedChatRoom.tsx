import { ReactComponent as ChatIcon } from "../../assets/icons-chat.svg";
import '../../styles/chatlist/UnSelectedChatRoom.scss'

export default function UnSelectedChatRoom() {
  return (
    <section className="unselect">
      <div className="unselect-content">
        <div><ChatIcon /></div>
        <div>대화방을 선택해주세요</div>
      </div>
    </section>
  );
}
