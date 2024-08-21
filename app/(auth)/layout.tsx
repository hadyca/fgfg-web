import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="py-4 bg-white px-10 border border-b-slate-200 z-20 relative">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FGFG
        </Link>
      </div>
      {children}
    </div>
  );
}
