import { useState } from "react"
import Link from "next/link"
import Tippy from "@/components/Tippy"

export default function BrowseMangaCard(props) {

  return (
    <Tippy placement="right" content={
      <div className="p-2 w-full">
        <h3 className="line-clamp-1">{props.title || "Default Title"}</h3>
        <div id="genres" className="flex flex-wrap">
          <span className="text-xs bg-blue-400 rounded-full px-2 py-1 mr-2 mb-2">Action</span>
          <span className="text-xs bg-purple-400 rounded-full px-2 py-1 mr-2 mb-2">Adventure</span>
          <span className="text-xs bg-green-400 rounded-full px-2 py-1 mr-2 mb-2">Comedy</span>
        </div>
        <p className={`text-sm mt-3 italic transition duration-200 card-description-opacity opacity-100 line-clamp-6 overflow-auto`}>
          {props.description || "Default Description"}
        </p>
      </div>
    }>

      <Link href={`/book/${props.id}`}>
        <div className="cursor-pointer flex flex-col group">
          <div className="flex w-full h-full">
            <img loading="lazy" src={props.cover || "https://www.iana.org/_img/2022/iana-logo-header.svg"} alt={props.title || "Default Title"} width={300} height={300} className="w-[300px] h-[260px] object-cover rounded-lg group-hover:opacity-50 button-animate" />
          </div>
          <div className="mt-3">
            <p className="font-medium text-[16px] text-white capitalize line-clamp-1">{props.title || "Default Title"}</p>
            <p className="font-medium text-zinc-300 text-sm">{props.author || "Default Author"}</p>
          </div>
        </div>
      </Link>
    </Tippy>
  )
}