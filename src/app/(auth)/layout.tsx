export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lg:-ml-64">{children}</div>;
}
