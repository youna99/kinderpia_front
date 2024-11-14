import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 컴포넌트 호출
import CommonButton1 from "../../common/CommonButton1";
import { MeetingData, MeetingUserData } from "../../../types/meeting";
import {
  deleteLeaveMeeting,
} from "../../../api/meeting";
import { confirmAlert, simpleAlert } from "../../../utils/alert";
import MeetingWaitListModal from "./MeetingWaitListModal";
import { getChatMessages, getChatRoom } from "../../../api/chat";
import { ChatRoomInfo } from "../../../types/chat";
import { useDispatch } from "react-redux";
import {
  markMessagesAsRead,
  setChatInfo,
  setMessages,
  setMsgPages,
  setOpen,
} from "../../../store/chatSlice";
import { setSelected } from "../../../store/chatRoomsSlice";
import '../../../styles/meeting/detailpage/MeetingActionJoined.scss';

interface MeetingActionJoinedProp {
  user?: MeetingUserData;
  data?: MeetingData;
}

const MeetingActionJoined: React.FC<MeetingActionJoinedProp> = ({
  user,
  data,
}) => {
  const navigate = useNavigate();
  const [whoAmI, setWhoAmI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { meetingId } = useParams<{ meetingId: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    if (!data) return;
    if (user.userId === data.userId) {
      setWhoAmI(true);
    }
  }, [whoAmI]);

  const moveToChatRoom = async (): Promise<void> => {
    await simpleAlert("success", "채팅방으로 이동합니다");
    try {
      // 단일 채팅방 조회
      if (data) {
        const res = await getChatRoom(data.chatroomId);
        if (res?.status === 200) {
          const chatInfo: ChatRoomInfo = res.data;
          dispatch(setChatInfo(chatInfo));
          // 채팅방 메시지 조회
          const res2 = await getChatMessages(data.chatroomId, 1);
          const chatMsgList = [...res2.data.data.chatmsgList].reverse();
          dispatch(setMessages(chatMsgList));
          dispatch(setMsgPages(res2.data.pageInfo));
          dispatch(setSelected(true));
          dispatch(markMessagesAsRead(data.chatroomId));
          dispatch(setOpen(false));
        }
      }
      navigate("/chatroom/list");
    } catch (error) {
      console.error("채팅방 이동 중 오류 발생:", error);
    }
  };

  const leaveMeeting = async (): Promise<void> => {
    try {
      const confirmed = await confirmAlert(
        "question",
        "정말로 모임을 떠나시겠습니까?",
        "모임에서 당신을 기다리고 있어요"
      );

      if (confirmed) {
        const result = await deleteLeaveMeeting(Number(meetingId));
        if (result) {
          simpleAlert("success", "모임에서 떠났습니다! 다음에 봐요", "center");
          navigate(`/meeting`);
        }
      }
    } catch (error) {
      console.error("모임 탈퇴 중 오류 발생:", error);
    }
  };

  const openWaitingList = async (): Promise<void> => {
    setIsModalOpen(true);
  };

  return (
    <div className="meeting-action-joined-container">
      <div className="meeting-action-joined-btn">
        <CommonButton1
          text="채팅방으로 이동하기"
          onClick={moveToChatRoom}
          disabled={false}
          isLoading={false}
        />
      </div>
      {whoAmI ? (
        <div className="meeting-action-joined-btn">
          {data?.authType && (
            <CommonButton1
              text="모임신청 대기자 목록"
              onClick={openWaitingList}
              disabled={false}
              isLoading={false}
            />
          )}
        </div>
      ) : (
        <div className="meeting-action-joined-btn">
          <CommonButton1
            text="모임 떠나기"
            onClick={leaveMeeting}
            disabled={false}
            isLoading={false}
          />
        </div>
      )}
      <MeetingWaitListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetingId={Number(meetingId)}
      />
    </div>
  );
};

export default MeetingActionJoined;
