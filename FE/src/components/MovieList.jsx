import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const CARD_WIDTH = 144;
const SCROLL_AMOUNT = CARD_WIDTH * 4;

const MovieList = ({ title, movies }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [translateVariable, setTranslateVariable] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      const maxScroll = containerWidth - contentWidth;
      setMaxTranslate(maxScroll);
    }
  }, [movies]);

  const handleLeftClick = () => {
    setTranslateVariable((prev) => Math.min(prev + SCROLL_AMOUNT, 0));
  };

  const handleRightClick = () => {
    setTranslateVariable((prev) =>
      Math.max(prev - SCROLL_AMOUNT, maxTranslate)
    );
  };

  return (
    <div className="mx-10 my-10">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div ref={containerRef} className="flex w-full overflow-hidden relative">
        <button
          className="text-white bg-red-500 absolute left-0 top-[40%] z-10 w-10 h-10 rounded-full"
          onClick={handleLeftClick}
        >
          {"<"}
        </button>
        <div
          ref={contentRef}
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(${translateVariable}px)` }}
        >
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
        <button
          className="text-white bg-red-500 absolute right-0 top-[40%] z-10 w-10 h-10 rounded-full"
          onClick={handleRightClick}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MovieList;
