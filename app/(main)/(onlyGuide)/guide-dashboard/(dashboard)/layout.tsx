export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div>{children}</div>
    </div>
  );
}
