import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [mainMovies, setMainMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const uniqueIndexes = new Set();
    while (uniqueIndexes.size < 3 && uniqueIndexes.size < movies.length) {
      uniqueIndexes.add(Math.floor(Math.random() * movies.length));
    }
    const selectedMovies = Array.from(uniqueIndexes).map((i) => movies[i]);
    setMainMovies(selectedMovies);
  }, [movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mainMovies.length);
    }, 30000);
    return () => clearInterval(interval);
  }, [mainMovies]);

  if (mainMovies.length === 0) return null;

  const currentMovie = mainMovies[currentIndex];

  return (
    <div className="bg-black w-full h-[120vh] overflow-hidden relative">
      <div className="absolute w-full h-full transition-opacity duration-1000 ease-in-out">
        <VideoTitle
          movie={currentMovie}
          title={currentMovie.original_title}
          overview={currentMovie.overview}
        />
        <VideoBackground movieId={currentMovie.id} movie={currentMovie} />
      </div>
    </div>
  );
};

export default MainContainer;
