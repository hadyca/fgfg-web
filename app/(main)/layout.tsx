import HeaderSection from "@/components/mainPage/headerSection";
import getUser from "@/lib/getUser";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div>
      <HeaderSection username={user?.data?.me?.username} />
      {children}
    </div>
  );
}
