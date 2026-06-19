import { ThemeToggle } from '@/common/components/layout/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ThemeToggle className="absolute top-6 right-6" />
      {children}
    </div>
  );
}
