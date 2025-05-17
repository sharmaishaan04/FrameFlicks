import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const VideoTitle = ({ title, overview, movie }) => {
  const navigate = useNavigate();
  return (
    <div className=" aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold ">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-2/5 max-h-60  overflow-hidden">
        {overview}
      </p>
      <div className="my-4 md:m-0">
        <button
          className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:opacity-80"
          onClick={() => navigate("/video", { state: { movie } })}
        >
          Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
