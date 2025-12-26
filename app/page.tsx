export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Auth App</h1>
      <p>Welcome! Please login or register.</p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 border rounded"
        >
          Register
        </a>
      </div>
    </main>
  );
}
