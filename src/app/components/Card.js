export default function Card({ img, title }) {
  return (
    <div className="mt-7 w-[90%] h-80 rounded-lg border-2 border-white text-center">
      <img
        src={img}
        alt={title + "Image"}
        height="320px"
        className="rounded-t-lg w-full"
      />
      <h4 className="font-semibold line-clamp-2 my-2">{title}</h4>
    </div>
  );
}