import Navbar from "@/components/organisms/Navbar";

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-500">Welcome back!</p>
      </main>
    </div>
  );
}

export default DashboardPage;
