import { useState, useEffect } from "react";
import Tippy from "@/components/Tippy";
import Link from "next/link"

export default function MiniCard(props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Tippy placement="right" content={
      <div className="p-2 w-full">
        <h3 className="line-clamp-1">{props.title}</h3>
        {/* <div id="genres" className="flex flex-wrap">
          <span className="text-xs bg-blue-400 rounded-full px-2 py-1 mr-2 mb-2"></span>
          <span className="text-xs bg-purple-400 rounded-full px-2 py-1 mr-2 mb-2"></span>
          <span className="text-xs bg-green-400 rounded-full px-2 py-1 mr-2 mb-2"></span>
        </div> */}
        <p className={`text-sm mt-3 italic transition duration-200 card-description-opacity opacity-100 line-clamp-6 overflow-auto`}>
          {props.description}
        </p>
      </div>
    }>
      <Link href={`/book/${props.id}`}>
        <div className="w-full h-full flex" onMouseEnter={(event) => setIsHover(true)} onMouseLeave={(event) => setIsHover(false)} >
          <img style={{
            width: "58px",
            height: "80px"
          }} className="rounded-l-lg bg-cover object-cover" src={props.cover} />
          <div className="bg-zinc-800/20 border-zinc-700/20 w-full min-h-full rounded-r-lg">
            <h1 className="ml-2 mt-4 w-[300px] line-clamp-1">{props.title}</h1>
            <p className="ml-2 text-sm text-gray-400 bg-gray-800/20 rounded-full px-2 py-1 inline-block">
              <span className="rounded-full bg-green-500 w-2 h-2 inline-block mr-1"></span> {props.chunk1}
            </p>
            {/* <p className="ml-2 text-sm text-gray-400 bg-gray-800/20 rounded-full px-2 py-1 inline-block">
              <span className="rounded-full bg-gray-500 w-2 h-2 inline-block mr-1"></span>
            </p> */}
            <p className="ml-2 text-sm text-gray-400 bg-gray-800/20 rounded-full px-2 py-1 inline-block">
              <span className="rounded-full bg-blue-500 w-2 h-2 inline-block mr-1"></span> {props.chunk2}
            </p>
          </div>
        </div>
      </Link>
    </Tippy>
  )
}