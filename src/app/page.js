import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl">Image Gallery</h1>
        <p className="font-semibold text-lg mt-4 mb-7">
          Store all your favorite Images in one place.
        </p>
        <Link
          href="/login"
          className="border border-white px-20 py-4 text-lg font-bold hover:bg-white hover:text-black rounded-xl"
        >
          Get Started {"->"}
        </Link>
      </div>
    </main>
  );
}
