import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import axios from 'axios';
import Tippy from '@tippyjs/react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import BrowseMangaCard from '@/components/Card/BrowseCard';

import "react-loading-skeleton/dist/skeleton.css";



export default function Home() {
    const [data, setData] = useState(null);

    const [results, setResult] = useState(null);
    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const pageSize = 18;

    useEffect(() => {
        axios.get(`/api/bookly/book/?page=${currentPage}`)
          .then(response => {
            setData(response.data);
            setResult(response.data.results);
            setCount(response.data.count);
            setLoading(false);
            setNumberOfPage(Math.ceil(response.data.count / pageSize));
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
            setLoading(false);
          });
        }, [currentPage]);

    const pageHandler = (direction) => {
        if (direction === "back") {
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
        } else if (direction === "next") {
            setCurrentPage(currentPage < numberOfPage ? currentPage + 1 : currentPage);
        }
        console.log(currentPage + " " + numberOfPage);
    };

    return (
        <>
            <NextSeo title={"Browse"} />
            <div className="lg:px-24 mx-auto justify-center lg:mt-8 pt-10">
                <div className="browse-banner bg-zinc-700/20 rounded-lg">
                    <img id="image" src="/banner.jpg" className="button-animate browse-image" />
                    <div id="black" className="bg-gradient-to-tr from-zinc-900/20 to-black browse-black"></div>
                    <div id="body" className="relative items-center text-center flex mx-auto justify-center">
                        <div className="flex flex-col mt-16">
                            <h1 className="text-white text-2xl font-semibold">Find the books you're looking for!</h1>
                            <p className="text-gray-100 text-md">The books you're looking for is just a few steps away.</p>
                            <div className=" flex space-x-2 mt-3.5  text-center items-center mx-auto bg-zinc-900/90 border border-zinc-700/20 px-4 rounded-lg">
                                <div className="absolute justify-center space-x-4 mr-4">
                                    <i className="fa-solid fa-search text-[17px] mt-1"></i>
                                </div>
                                <input className="bg-zinc-700/20 navbar-input px-6 border !w-[18rem] lg:!w-[32rem] border-zinc-700/10" placeholder="Discover the Books!" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-4 block lg:hidden px-4">
                    {/* Categories slider */}
                    <div className="flex flex-row space-x-1 items-center overflow-x-auto">
                        <div className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                            <p className="text-center">All</p>
                        </div>
                        {/* <div className={`bg-zinc-700/30 rounded-lg justify-between button-animate p-3 text-sm flex cursor-pointer mt-2 hover:bg-zinc-700/20`}>
                            <p className="text-center line-clamp-1 w-12 h-4">Drama</p>
                        </div> */}
                    </div>

                </div>
                <div className="body mt-4 flex flew-row space-x-4">
                    <div className="hidden lg:block w-60 h-[64rem] overflow-auto rounded-lg bg-zinc-700/20 border border-zinc-700/10">
                        <div className="p-4">
                            <div className="flex flex-col">
                                <div className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                                    <p className="text-center">All</p>
                                    <p className="text-center text-sm">{count}</p>
                                </div>
                            </div>
                            <div className="mt-3 px-1">
                                <div className="bg-zinc-700/40 w-full h-[1px]"></div>
                            </div>
                            {/* <div className="flex flex-col mt-1 overflow-auto">
                                <div className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                                    <p className="text-center">Comedy</p>
                                    <p className="text-center text-sm">2</p>
                                </div>
                                <div className={`bg-zinc-700/10 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                                    <p className="text-center">Action</p>
                                    <p className="text-center text-sm">3</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <div id="body" className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 p-4">
                            {loading ? Array.from(Array(18).keys()).map((d) => <SkeletonComponent key={d} />) : results && results.map(item => <BookComponent key={item.id} book={item} />)}
                        </div>
                    </div>
                </div>
                <div className="mx-auto justify-center flex space-x-4">
                    <div className="flex space-x-4 lg:mt-0 mt-2">
                        <Tippy content="Previous Page">
                            <button onClick={() => pageHandler("back")} className="bg-zinc-500/20 p-2 px-4 rounded-md cursor-pointer">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        </Tippy>
                        <button className="bg-zinc-500/20 p-2 px-4 rounded-md cursor-pointer">{currentPage}</button>
                        <Tippy content="Next Page">
                            <button onClick={() => pageHandler("next")} className="bg-zinc-500/20 p-2 px-4 rounded-md cursor-pointer">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </>
    )
}


function BookComponent({ book }) {
    return (
        <BrowseMangaCard
            id={book.id}
            title={book.title}
            author={book.author_name}
            cover={`/${book.cover}`}
            description={book.description}
        />
    );
}
  
function SkeletonComponent() {
    return (
        <div>
            <SkeletonTheme baseColor="#202020" highlightColor="#232323">
                <div className="flex flex-col">
                <Skeleton className="w-[300px] h-[260px]" />
                <Skeleton className="w-[300px] h-[17px] mt-4" />
                <Skeleton width={"120px"} className="h-[12px] mt-1" />
                </div>
            </SkeletonTheme>
        </div>
    );
}
