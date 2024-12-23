import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function NoMessageChatRoom() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center">
      <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 text-gray-400 mb-4" />
      <span className="text-lg text-gray-500">{t("chatRoom.noMessage")}</span>
      <p className="text-sm text-gray-400 mt-2">
        {t("chatRoom.noMessageDescription")}
      </p>
    </div>
  );
}
