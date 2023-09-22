"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/signup");
  }, [user]);

  console.log(filteredImages);

  function handleImageSelect(event) {
    setFile(event.target.files[0]);
    setSelectedImage({
      id: Date.now().toString(),
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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newImagesOrder = [...filteredImages];
    const [reorderedImage] = newImagesOrder.splice(result.source.index, 1);
    newImagesOrder.splice(result.destination.index, 0, reorderedImage);

    setFilteredImages(newImagesOrder);
  };

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
          Welcome to your Image Gallery
        </h1>
        <div className="mx-8 sm:px-4 md:px-10 py-7 sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1150px] mt-7 mb-5 border border-white rounded-lg">
          <div className="px-4 flex justify-between">
            <h4 className="text-xl md:text-2xl font-semibold">Image Gallery</h4>
            <Link
              href="/"
              className="flex text-sm md:text-md my-auto hover:text-gray-200"
            >
              {"<-"}Back{" "}
            </Link>
          </div>
          <div className="px-4 mt-5 flex relative w-full">
            <input
              className="bg-transparent w-full py-2 border-2 border-white rounded-lg pl-3 focus:outline-none font-medium"
              onChange={handleSearch}
            />
            <FaSearch
              size="20px"
              className="absolute top-0 right-0 mr-7 mt-2.5"
            />
          </div>
          {images.length > 0 && (
            <>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center mb-5"
                      {...provided.droppableProps}
                    >
                      <label className="w-[90%]">
                        <input
                          type="file"
                          hidden
                          onChange={handleImageSelect}
                        />
                        {selectedImage ? (
                          <div className="mt-7 w-[90%] h-[320px]">
                            <img
                              className="w-max-content h-72"
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
                                <AiOutlineClose
                                  size="30px"
                                  className="mx-auto"
                                />
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
                                  <AiOutlineCheck
                                    size="30px"
                                    className="mx-auto"
                                  />
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-7 flex items-center justify-center h-[320px] rounded-lg border-2 border-white text-center hover:bg-white/25">
                            <div>
                              <h4 className="text-3xl font-semibold ">
                                Add More
                              </h4>
                              <p className="text-6xl font-bold">+</p>
                            </div>
                          </div>
                        )}
                      </label>
                      {filteredImages.map((image, index) => (
                        <Draggable
                          key={image.id}
                          draggableId={image.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card img={image.url} title={image.title} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
          {images.length === 0 && (
            <div className="md:mt-5 py-16 w-full flex items-center justify-center text-center">
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
                      <p>Click here to add</p>
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
