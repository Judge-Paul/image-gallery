"use client";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Card from "../components/Card";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const { user } = useAuthContext();

  function handleImageSelect(event) {
    setFile(event.target.files[0]);
    setSelectedImage({
      url: URL.createObjectURL(event.target.files[0]),
      title: event.target.files[0]?.name.split(".")[0], //To remove the file extension name
    });
  }

  const uploadImage = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // if (!res.ok) throw new Error(await res.text());
      const { success } = await res.json();
      if (!success) throw new Error("Upload failed");
      else {
        toast.success("Image Uploaded Successfully");
        setImages((currImages) => [...currImages, selectedImage]);
        setSelectedImage(null);
        setFile(null);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);
  function handleSearch(event) {
    const { value } = event.target;
    setSearchValue(value);
    if (filteredImages.length === 0) {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((image) => image.title.includes(value)));
    }
  }

  return (
    <main className="mt-10 flex justify-center items-center">
      <div>
        <h1 className="font-semibold text-xl text-center">
          Welcome to your Meme Gallery, {}
        </h1>
        <div className="mx-8 px-4 md:px-10 py-7 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1150px] mt-7 mb-5 border border-white rounded-lg">
          <div className="px-4 flex justify-between">
            <h4 className="text-2xl font-semibold">Meme Gallery</h4>
            <Link href="/" className="my-auto hover:text-gray-200">
              {"<-"} Back to Homepage
            </Link>
          </div>
          <div className="px-4 mt-5 relative">
            <input
              className="bg-transparent w-full py-2 border-2 border-white rounded-lg pl-3 focus:outline-none font-medium"
              onChange={handleSearch}
            />
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center mb-5">
              <label>
                <input type="file" hidden onChange={handleImageSelect} />
                <div className="mt-7 w-[90%] h-[320px] rounded-lg border-2 border-white text-center hover:bg-white/25">
                  <h4 className="text-3xl font-semibold ">Add More</h4>
                  <p className="text-6xl">+</p>
                </div>
              </label>
              {filteredImages.map((image, index) => (
                <Card key={index} img={image.url} title={image.title} />
              ))}
            </div>
          )}
          {images.length === 0 && (
            <div className="mt-5 py-16 w-full flex items-center justify-center text-center">
              <label>
                <input type="file" hidden onChange={handleImageSelect} />
                <div className="w-80 aspect-video rounded flex items-center justify-center cursor-pointer">
                  {selectedImage ? (
                    <div className="w-80 h-80 block">
                      <img
                        width="w-80 h-72"
                        src={selectedImage?.url}
                        alt={selectedImage?.title}
                      />
                      <div className="mt-1 flex max-w-full">
                        <input
                          className="bg-transparent border-2 border-white focus:outline-none w-[70%]"
                          type="text"
                          onChange={(e) =>
                            setSelectedImage((imageData) => ({
                              ...imageData,
                              title: e.target.value,
                            }))
                          }
                          value={selectedImage?.title}
                        />
                        <button
                          onClick={() => {
                            setSelectedImage(null);
                          }}
                          className="w-[15%] bg-red-500 hover:bg-red-400 text-white"
                        >
                          <AiOutlineClose size="30px" className="mx-auto" />
                        </button>
                        <button
                          onClick={uploadImage}
                          className="w-[15%] bg-green-500 hover:bg-green-400 text-white"
                        >
                          {isLoading ? (
                            <BiLoaderAlt
                              size="25px"
                              className="animate-spin mx-auto"
                            />
                          ) : (
                            <AiOutlineCheck size="30px" className="mx-auto" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="h-80 flex flex-col justify-center border-2 border-dashed items-center">
                      <p>No Images Added</p>
                      <p>Click here to add or</p>
                      <p>Drag and drop the image here</p>
                    </span>
                  )}
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
