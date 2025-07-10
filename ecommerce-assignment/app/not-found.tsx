export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 – Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you’re looking for doesn’t exist.</p>
        <a href="/" className="text-primary underline">Go Back Home</a>
      </div>
    </main>
  );
}
