import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="py-4 bg-white px-10 shadow-md">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FGFG
        </Link>
      </div>
      {children}
    </div>
  );
}
