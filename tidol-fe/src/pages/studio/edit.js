import { NextSeo } from "next-seo"
import Link from "next/link"

export default function Home() {

  const chapter = {
    id: 1,
    number: 1,
    title: "A New Chapter"
  }
  return (
    <>
      <NextSeo title="Edit"/>
      <div className="lg:px-24 mx-auto justify-center lg:mt-8 pt-10">
        <div className="flex flex-row mb-8">
          <div className="flex flex-col w-1/4 justify-center">
            <img className="h-[250px] lg:w-[175px] w-[100px] object-cover rounded-b-lg rounded-l-lg rounded-r-none self-center" src="https://www.mangaread.org/wp-content/uploads/2022/12/Read-Manhwa-6-193x278.jpg" />
            <div className="h-[40px] w-[200px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex self-center">
              <p className="self-center text-lg">Change Book Cover</p>
            </div>

            {/* Book cover here */}
            <input type="file" className="self-center" />
          </div>
          <div className="w-3/4 flex flex-col gap-4">

            {/* Book title field here */}
            <p className="text-lg">Book title</p>
            <input type="text" className="w-full bg-zinc-700/20 px-6 border-3 border-zinc-200"/>
            
            {/* Book description field here */}
            <p className="text-lg">Book description</p>
            <textarea className="w-full bg-zinc-700/20 px-6 border-3 border-zinc-200 text-wrap h-auto grow"/>
          </div>
        </div>

        {/* Chapter panel */}
        <div className="bg-zinc-700/20 w-full gap-4 rounded-lg flex flex-col p-8">
          <div className="button-animate cursor-pointer hover:bg-zinc-700/60 h-[40px] w-[300px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex self-end">
            <p className="self-center text-lg">Add New Chapter</p>
          </div>
          <ChapterPanel chapter={chapter} />
          <ChapterPanel chapter={chapter} />
          <ChapterPanel chapter={chapter} />
        </div>

        {/* Plz add action */}
        <div className="button-animate cursor-pointer hover:bg-zinc-700/60 h-[40px] w-[400px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex self-center">
          <p className="self-center text-lg">Save Changes</p>
        </div>
      </div>
    </>
  )
}

  // Plz add action
export function ChapterPanel({chapter}) {
  return (
    <div className="rounded-lg p-5 flex flex-row bg-zinc-700/50">
      <p className="text-lg self-center grow">Chapter {chapter.number}: {chapter.title}</p>
      <Link href="/studio/edit/chapter">
        <div className="button-animate cursor-pointer hover:bg-green-500/60 h-auto bg-zinc-700/20 mx-2 rounded justify-center flex self-center p-2">
          <p className="self-center text-lg">Edit</p>
        </div>
      </Link>
      <div className="button-animate cursor-pointer hover:bg-red-500/60 h-auto bg-zinc-700/20 mx-2 rounded justify-center flex self-center p-2">
        <p className="self-center text-lg">Delete</p>
      </div>
    </div>
  )
}