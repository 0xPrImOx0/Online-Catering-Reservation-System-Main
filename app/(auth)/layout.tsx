import ThemeMode from "@/components/ThemeMode";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  ThemeMode: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-5 left-5 z-10">
        <ThemeMode />
      </div>
      {children}
    </>
  );
}
