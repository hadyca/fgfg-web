import HeaderSection from "@/components/mainPage/headerSection";
import getUser from "@/lib/getUser";
import getSession from "@/lib/session";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <>
      <HeaderSection
        userId={user?.me?.id}
        avatar={user?.me?.avatar}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
