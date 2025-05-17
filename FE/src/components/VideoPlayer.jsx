import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
const VideoPlayer = () => {
  const location = useLocation();
  const movie = location.state.movie;
  console.log(movie);

  const getMovieImages = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movie.id + "/images",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);
  };

  useEffect(() => {
    getMovieImages();
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const { original_title, overview } = movie;

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.requestFullscreen();
    videoRef.current?.play();
  };

  const handleBack = () => {
    setIsPlaying(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    videoRef.current?.pause();
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`w-[70%] absolute end-0 object-cover border-r border-white transition-all duration-700 ease-in-out ${
          isPlaying ? "w-full h-screen" : ""
        }`}
        playsInline
        muted
        controls={isPlaying}
      >
        <source src="http://localhost:3000/video" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {isPlaying && (
        <button
          className=" bg-black/60 text-white px-4 py-2 rounded hover:bg-black/80 transition absolute"
          onClick={handleBack}
        >
          Back
        </button>
      )}

      {!isPlaying && (
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-40% from-black to-transparent p-10 text-white shadow-2xl z-10 flex flex-col justify-between">
          <div className="mt-10">
            <h1 className="text-4xl font-bold mb-6 w-2/5">{original_title}</h1>
            <p className="text-lg mb-8 line-clamp-5 w-2/5">{overview}</p>
            <button
              className="bg-gray-500 text-white w-1/10 h-10 rounded-md mr-10 p-2 hover:bg-red-500 delay-75 hover:scale-101 hover:delay-75 transition-all "
              onClick={handlePlay}
            >
              Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
