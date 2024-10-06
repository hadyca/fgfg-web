import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function NoMessageChatRoom() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center">
      <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 text-gray-400 mb-4" />
      <span className="text-lg text-gray-500">메세지가 없습니다.</span>
      <p className="text-sm text-gray-400 mt-2">
        다른 사용자에게 메시지를 보내 대화를 시작해보세요.
      </p>
    </div>
  );
}
