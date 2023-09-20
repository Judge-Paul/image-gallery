import Link from "next/link";

export default function Gallery() {
  return (
    <main className="mt-10 flex justify-center items-center">
      <div>
        <h1 className="font-semibold text-xl text-center">
          Welcome to your Meme Gallery, {}
        </h1>
        <div className="mx-8 px-4 md:px-10 py-7 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1150px] mt-7 mb-5 border border-white rounded-lg">
          <div className="px-4 flex justify-between">
            <h4 className="text-2xl font-semibold">Meme Gallery</h4>
            <Link href="/" className="my-auto">
              Back to Homepage
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center mb-5">
            <button className="mt-7 w-[90%] h-[320px] rounded-lg border-2 border-white text-center hover:bg-white/25">
              <h4 className="text-3xl font-semibold ">Add More</h4>
              <p className="text-6xl">+</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
