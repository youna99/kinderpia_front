import ChatRooms from '../components/chatlist/ChatRooms';
import '../styles/domain/chatlist/ChatListPage.scss';

export default function ChatlistPage() {
  return (
    <section className="chatlist">
      <h2>Chats</h2>
      <ChatRooms />
    </section>
  );
}
