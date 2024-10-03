import { create } from "zustand";

interface ChatRoom {
  id: string;
  avatar: string;
  usernameOrFullname: string;
  lastMessage: string;
  createdAt: string;
  isRead: boolean;
}

interface User {
  avatar: string;
  id: number;
  username: string;
}

interface Message {
  id: number;
  payload: string;
  createdAt: string;
  user: User;
  isMyMessage: boolean;
}

interface ChatRoomState {
  //1. chatRooms관련
  chatRooms: ChatRoom[];
  initialChatRoomsLoading: boolean;
  setInitialChatRoomsLoading: (loading: boolean) => void;
  setChatRooms: (rooms: ChatRoom[]) => void;
  updateIsReadInRoom: (chatRoomId: string, isRead: boolean) => void; // 여기에 추가
  removeChatRoom: (chatRoomId: string) => void;
  updateLastMessageInRoom: (
    chatRoomId: string,
    lastMessage: string,
    createdAt: string,
    avatar?: string,
    usernameOrFullname?: string
  ) => void;

  //2. messages관련
  messages: Record<string, Message[]>; // 각 채팅방의 메시지를 저장하는 객체
  initialMessagesLoading: Record<string, boolean>; // 각 채팅방별로 로딩 상태 관리
  setInitialMessagesLoading: (chatRoomId: string, loading: boolean) => void;
  setMessages: (chatRoomId: string, newMessages: Message[]) => void;
}

export const useChatRoomStore = create<ChatRoomState>((set) => ({
  //1. chatRooms관련
  initialChatRoomsLoading: true, //처음에는 로딩 스켈레톤을 불러와줘야 하기 떄문에, true로 표시
  chatRooms: [],
  setInitialChatRoomsLoading: (loading) =>
    set({ initialChatRoomsLoading: loading }),
  setChatRooms: (chatRoom) => set({ chatRooms: chatRoom }),
  // 특정 채팅방의 마지막 메시지를 업데이트하는 로직
  updateLastMessageInRoom: (
    chatRoomId,
    lastMessage,
    createdAt,
    avatar,
    usernameOrFullname
  ) =>
    set((state) => {
      const existingRoom = state.chatRooms.find(
        (chatRoom) => chatRoom.id === chatRoomId
      );

      // 기존 chatRoomId가 없을 경우 새로운 chatRoom 추가
      if (!existingRoom) {
        const newChatRoom: ChatRoom = {
          id: chatRoomId,
          avatar: avatar || "", // avatar가 없으면 빈 값으로 설정
          usernameOrFullname: usernameOrFullname || "Unknown", // 이름이 없으면 "Unknown"으로 설정
          lastMessage,
          createdAt,
          isRead: false,
        };
        return {
          chatRooms: [...state.chatRooms, newChatRoom].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        };
      }

      // 기존 chatRoomId가 있는 경우 해당 채팅방의 lastMessage와 createdAt만 업데이트
      return {
        chatRooms: state.chatRooms
          .map((chatRoom) =>
            chatRoom.id === chatRoomId
              ? { ...chatRoom, lastMessage, createdAt }
              : chatRoom
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
      };
    }),
  // 특정 채팅방의 isRead 값을 true로 업데이트하는 로직
  updateIsReadInRoom: (chatRoomId, isRead) =>
    set((state) => ({
      chatRooms: state.chatRooms.map((chatRoom) =>
        chatRoom.id === chatRoomId ? { ...chatRoom, isRead } : chatRoom
      ),
    })),
  removeChatRoom: (chatRoomId) =>
    set((state) => ({
      chatRooms: state.chatRooms.filter(
        (chatRoom) => chatRoom.id !== chatRoomId
      ),
    })),

  //2.Messages관련
  initialMessagesLoading: {},
  messages: {}, // 각 채팅방의 메시지를 저장하는 객체
  setInitialMessagesLoading: (chatRoomId, loading = true) =>
    set((state) => ({
      initialMessagesLoading: {
        ...state.initialMessagesLoading,
        [chatRoomId]: loading,
      },
    })),
  setMessages: (chatRoomId, newMessages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatRoomId]: newMessages,
      },
    })),
}));
