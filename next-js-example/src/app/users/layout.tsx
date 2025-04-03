export default function UsersLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Shared Header */}
        <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
          Users Page
        </header>
  
        {/* Page Content */}
        <main className="p-6">{children}</main>
        </div>
    );
  }
  