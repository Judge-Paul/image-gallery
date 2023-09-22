"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import Card from "../components/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import CardSkeleton from "../components/CardSkeleton";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/signup");
  }, [user]);

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos/random?count=12", {
        headers: {
          Authorization: UNSPLASH_ACCESS_KEY,
        },
      })
      .then((response) => {
        const fetchedImages = response.data.map((image) => ({
          id: image.id,
          url: image.urls.regular,
          title: image.alt_description || "Untitled",
        }));
        setImages(fetchedImages);
        setFilteredImages(fetchedImages);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  console.log(isLoading);
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
    if (images.length === 0) {
      setFilteredImages([]);
    } else {
      setFilteredImages(
        images.filter((image) =>
          image.title.toLowerCase().includes(value.toLowerCase()),
        ),
      );
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
          </div>
          <div className="px-4 mt-5 flex relative w-full">
            <input
              className="bg-transparent w-full py-2 border-2 border-white rounded-lg pl-3 focus:outline-none font-medium"
              placeholder="Search images..."
              onChange={handleSearch}
              value={searchValue}
            />
            <FaSearch
              size="20px"
              className="absolute top-0 right-0 mr-7 mt-2.5"
            />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center mb-5"
                  {...provided.droppableProps}
                >
                  {isLoading ? (
                    <>
                      <CardSkeleton />
                      <CardSkeleton />
                      <CardSkeleton />
                      <CardSkeleton />
                    </>
                  ) : (
                    <>
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
                              <LoadingSkeleton height={320} width="90%" />
                              <Card img={image.url} title={image.title} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </main>
  );
}
