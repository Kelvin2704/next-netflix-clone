import Image from "next/image"
import { Movie } from "../typings"
import { useState, useEffect } from 'react'
import { baseUrl } from "../constansts/movie";
import {FaPlay} from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/solid";

interface Props {
  netflixOriginals: Movie[]
}
function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  console.log(movie)

  return (
    <div className="flex flex-col space-y-2 py-14 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-full">
        <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        layout='fill'
        objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-md md:text-md">{movie?.overview}</p>
      <div className="flex space-x-1.5 md:space-x-2">
        <button className="bannerButton bg-white text-black"><FaPlay className="h-4 w-4 text-black" />Play</button>
        <button className="bannerButton bg-[gray]/70">More Info <InformationCircleIcon className="h-4 w-4"/></button>
      </div>
    </div>
  )
}

export default Banner