import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import axios from "axios";

import EditorialCard from "@/components/Card/EditorialCard";

export default function Home() {

  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/bookly/getinfoofauthor/?author_id=${id}`)
      .then(({ data }) => {
        setAuthor(data);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          window.location.href = '/404';
        }
      })
    axios.get(`/api/bookly/getbookofauthor/?author_id=${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          window.location.href = '/404';
        }
      })
  }, [id]);

  return (
    <>
      <div className="lg:px-24 mx-auto justify-center lg:mt-8 pt-10">
        <div className="h-[100px] flex justify-center">
          <p className="text-4xl font-bold self-center">{author.name}</p>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-row">
            <p className="text-xl grow self-center">Total book counts: {data.length}</p>
          </div>
          {
            data.map(book => {
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
                book_id={book.id}
                book_title={book.title}
                description={book.description}
                chunk1={`Lượt xem: ${book.viewcount}`}
                chunk2={``}
                chunk3 = {`Cập nhật lần cuối: ${new Date(book.lastupdated).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' })} - ${new Date(book.lastupdated).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}`}
                cover={`/${book.cover}`}
            />
        </div>
        {/* <div className="w-full flex flex-row justify-center">
        </div> */}
      </>
    );
}