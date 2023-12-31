export default function Card({ img, title }) {
  return (
    <div className="mt-7 mx-4 md:mx-0 w-[90%] sm:h-80 rounded-lg border-2 border-white text-center flex flex-col">
      <div className="flex-grow">
        <img
          src={img}
          alt={"an image of " + title}
          className="h-[260px] w-full object-cover rounded-t-lg"
        />
      </div>
      <h4 className="font-semibold line-clamp-2 my-2">{title}</h4>
    </div>
  );
}