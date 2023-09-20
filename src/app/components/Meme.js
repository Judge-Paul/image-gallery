import Image from "next/image";
import Me from "@/app/me.jpeg";

export default function Meme({ img, name }) {
  return (
    <div className="mt-7 w-[90%] h-80 rounded-lg border-2 border-white text-center">
      <Image src={img} height={300} className="w-full rounded-t-lg" />
      <h4 className="font-semibold line-clamp-2 my-2">{name}</h4>
    </div>
  );
}
