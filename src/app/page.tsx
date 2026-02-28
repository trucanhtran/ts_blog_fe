// import component
import Link from "next/link";

const Home = () => (
  <main className="flex min-h-screen flex-col items-center justify-center p-8">
    <h1 className="text-4xl font-bold mb-4">TS Blog</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
      Next.js + TypeScript + React — chạy bằng Docker Compose
    </p>
    <Link href="/sample" className="text-blue-600 hover:underline font-medium">
      → Trang sample (API + MUI)
    </Link>
  </main>
);

export default Home;
