import { logout } from "@/lib/sharedActions";
import getUser from "@/lib/getUser";

export default async function UserProfile() {
  const user = await getUser();

  return (
    <div>
      <h1>프로필 화면</h1>
      <h1>반갑습니다! {user?.me?.username}님</h1>
      <form action={logout}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
