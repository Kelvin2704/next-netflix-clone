import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"
import { useRef, useState } from 'react'

interface Props {
  title: string
  movies: Movie[]
  // movie:Movie | DocumentData[]
}
const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const handleClick = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      //lấy ra scrollLeft và clientWidth từ rowRef.current
      const { scrollLeft, clientWidth } = rowRef.current
      //dựa trên tham số direction mà lấy scrollLeft cộng hay trừ với clientWidth
      const scrollTo = direction === "left" 
      ? scrollLeft - clientWidth 
      : scrollLeft + clientWidth

      rowRef.current.scrollTo({left:scrollTo,behavior:"smooth"})
    }
  }
  console.log(rowRef.current?.scrollLeft,rowRef.current?.clientWidth)
  return (
    <div className="h-28 md:h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 text-sm cursor-pointer font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl">{title}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon className={`absolute top-0 bottom-0 left-0 md:left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`} onClick={() => handleClick("left")} />

        <div ref={rowRef} className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon className={`absolute top-0 bottom-0 right-0 md:right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`} onClick={() => handleClick("right")} />
      </div>
    </div>
  )
}

export default Row
