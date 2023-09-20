import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl">Meme Gallery</h1>
        <p className="font-semibold text-lg mt-4 mb-7">
          Store your favorite memes using our meme gallery. Store and discover
          new memes.
        </p>
        <Link
          href="/auth"
          className="border border-white px-20 py-4 text-lg font-bold hover:bg-white hover:text-black rounded-xl"
        >
          Get Started {"->"}
        </Link>
      </div>
      <div></div>
    </main>
  );
}
