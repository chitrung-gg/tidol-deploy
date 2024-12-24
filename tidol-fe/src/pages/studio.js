import EditorialCard from "@/components/Card/EditorialCard";
import Link from "next/link";
import { useState } from "react";
import { NextSeo } from 'next-seo';

export default function home() {

  const [dummyData, setDummyData] = useState([
    {
      id: 0,
      title: "ABC",
      author_name: "Author",
      cover: 1,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }, 
    {
      id: 1,
      title: "DEF",
      author_name: "Author",
      cover: 3,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
  ])

  return (
    <>
      <NextSeo title="Studio"/>
      <div className="lg:px-24 mx-auto justify-center lg:mt-8 pt-10">
        <div className="h-[100px] flex justify-center">
          <p className="text-4xl font-bold self-center">Author</p>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-row">
            <p className="text-xl grow self-center">Total book counts: {dummyData.length}</p>
            <Link href={`/studio/edit`}>
              <div className={`button-animate p-2 px-6 text-sm flex items-center text-center justify-center cursor-pointer mt-2 rounded-lg bg-zinc-700/40 border border-zinc-700/20 hover:bg-zinc-700/60`}>
                <p className="text-xl">Add New Book</p>
              </div>
            </Link>
          </div>
          {/* Where your books will be displayed*/}
          {
            dummyData.map(book => {
              return (
                <BookComponent book={book} key={book.id}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

function BookComponent({ book }) {
    return (
      <>
        <div className="flex flex-col">
            <EditorialCard
                book_title={book.title}
                description={book.description}
                chunk1={`Tác giả: ${book.author_name}`}
                cover="https://www.mangaread.org/wp-content/uploads/2022/12/Read-Manhwa-6-193x278.jpg"
            />
        </div>
        <div className="w-full flex flex-row justify-center">
          {/* Route to edit page */}
          <Link
            href={`/studio/edit`}
          >
            <div className="button-animate cursor-pointer hover:bg-zinc-700/60 h-[40px] w-[200px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex">
              <p className="self-center text-lg">Edit Book</p>
            </div>
          </Link>

          {/* Remove book from database */}
          <div className="button-animate cursor-pointer hover:bg-zinc-700/60 h-[40px] w-[200px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex">
            <p className="self-center text-lg">Delete Book</p>
          </div>
        </div>
      </>
    );
}