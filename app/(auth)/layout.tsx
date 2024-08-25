import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-16 px-4 bg-white border-b border-b-slate-200 z-20 relative flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FGFG
        </Link>
      </div>
      {children}
    </div>
  );
}
