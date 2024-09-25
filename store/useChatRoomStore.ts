import { create } from "zustand";

interface ChatRoom {
  id: string;
  avatar: string;
  usernameOrFullname: string;
  lastMessage: string;
  createdAt: string;
  isRead: boolean;
}

interface ChatRoomState {
  chatRooms: ChatRoom[];
  setChatRooms: (rooms: ChatRoom[]) => void;
  updateLastMessageInRoom: (
    chatRoomId: string,
    lastMessage: string,
    createdAt: string
  ) => void;
  updateIsReadInRoom: (chatRoomId: string, isRead: boolean) => void; // 여기에 추가
  initialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
}

export const useChatRoomStore = create<ChatRoomState>((set) => ({
  initialLoading: true, // 초기 로딩 상태는 true로 시작
  setInitialLoading: (loading) => set({ initialLoading: loading }), // 로딩 상태 변경 함수

  chatRooms: [],
  setChatRooms: (chatRoom) => set({ chatRooms: chatRoom }),
  // 특정 채팅방의 마지막 메시지를 업데이트하는 로직
  updateLastMessageInRoom: (chatRoomId, lastMessage, createdAt) =>
    set((state) => ({
      chatRooms: state.chatRooms
        .map((chatRoom) =>
          chatRoom.id === chatRoomId
            ? { ...chatRoom, lastMessage, createdAt }
            : chatRoom
        )
        // 배열을 최신 메시지 순으로 정렬
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    })),
  // 특정 채팅방의 isRead 값을 true로 업데이트하는 로직
  updateIsReadInRoom: (chatRoomId, isRead) =>
    set((state) => ({
      chatRooms: state.chatRooms.map((chatRoom) =>
        chatRoom.id === chatRoomId ? { ...chatRoom, isRead } : chatRoom
      ),
    })),
}));
