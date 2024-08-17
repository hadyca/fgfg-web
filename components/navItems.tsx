import Link from "next/link";
interface NavItemsProps {
  username: string;
}

export default function NavItems({ username }: NavItemsProps) {
  return (
    <>
      <li className="text-right">
        <Link
          href="/search-guide"
          className="text-gray-800 hover:text-teal-600"
        >
          가이드 찾기
        </Link>
      </li>
      <li className="text-right">
        <Link
          href="/signup-guide"
          className="text-gray-800 hover:text-teal-600"
        >
          가이드 등록
        </Link>
      </li>
      {username ? (
        <li className="text-right">
          <Link href="/profile" className="text-gray-800 hover:text-teal-600">
            {username}
          </Link>
        </li>
      ) : (
        <>
          <li className="text-right">
            <Link href="/login" className="text-gray-800 hover:text-teal-600">
              로그인
            </Link>
          </li>
          <li className="text-right">
            <Link
              href="/create-account"
              className="text-gray-800 hover:text-teal-600"
            >
              회원가입
            </Link>
          </li>
        </>
      )}
    </>
  );
}
