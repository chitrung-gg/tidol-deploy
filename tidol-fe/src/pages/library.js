import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import BigCard from '@/components/Card/BigCard';


export default function Home() {
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState("start");

    const [recentList, setRecentList] = useState([]);
    const [followList, setFollowList] = useState([]);

    const handleRecentListAPI = async () => {
        if (localStorage.getItem("access_token") === null) {
            toast.error("Bạn cần đăng nhập để sử dụng tính năng này");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/bookly/history/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`,
            }
        });

        if (res.status === 200) {
            setRecentList(await res.json());
        } else {
            setRecentList([]);
            if (res.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        }

        setLoading(false);
    };
    const handleFollowListAPI = async () => {
        if (localStorage.getItem("access_token") === null) {
            toast.error("Bạn cần đăng nhập để sử dụng tính năng này");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/bookly/follow/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`,
            }
        });

        if (res.status === 200) {
            setFollowList(await res.json());
        } else {
            setFollowList([]);
            if (res.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        }

        setLoading(false);
    };




    let title = "Library";
    let content = null;

    const changeMenu = (menu) => {
        switch(menu) {
            case "recent":
                setMenu(menu);
                handleRecentListAPI();
                break;

            case "follow":
                setMenu(menu);
                handleFollowListAPI();
                break;

            default:
                setMenu("error");
                break;
        }
    };


    if (loading) {
        title = "Loading...";
    } else {
        title = "Library";

        switch(menu) {
            case "start":
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Thư viện cá nhân</h1></div>
                        </div>
                    </>
                );
                break;

            case "recent":
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Đã đọc gần đây</h1></div>
                        </div>
                        <div className='mt-4 w-full'>
                           <div id="body" className="flex flex-col p-4">
                                {loading ? Array.from(Array(18).keys()).map((d) => <SkeletonComponent key={d} />) : recentList && recentList.map(item => <BookComponent key={item.id} history={item} />)}
                            </div>
                        </div>
                    </>
                );
                break;

            case "follow":
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Danh sách theo dõi</h1></div>
                        </div>
                        <div className='mt-4 w-full'>
                           <div id="body" className="flex flex-col p-4">
                                {loading ? Array.from(Array(18).keys()).map((d) => <SkeletonComponent key={d} />) : followList && followList.map(item => <FollowComponent key={item.id} follow={item} />)}
                            </div>
                        </div>
                    </>
                );
                break;

            default:
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Error</h1></div>
                        </div>
                    </>
                );
                break;
        }
    }

    return (
    <>
        <NextSeo title={title} />
        <div className='lg:px-24 mx-auto justify-center lg:mt-8 pt-10'>
            <div className='body mt-4 flex flew-row space-x-4'>
                <div className='hidden lg:block w-60 h-[64rem] overflow-auto rounded-lg bg-zinc-700/20 border border-zinc-700/10'>
                    <div className="flex flex-col mt-1 overflow-auto">
                        <div onClick={() => changeMenu("recent")} className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                            <p className="text-center">Đã đọc gần đây</p>
                            <p className="text-center text-sm">.</p>
                        </div>
                        <div onClick={() => changeMenu("follow")} className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                            <p className="text-center">Danh sách theo dõi</p>
                            <p className="text-center text-sm">.</p>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {content}
                </div>
            </div>
        </div>
    </>
  )
}

function BookComponent({ history }) {
    let date = new Date(history.timestamp);
    return (
        <BigCard
            book_id={history.book_id}
            chapter_id={history.chapter_id}
            book_title={history.book_title}
            description={history.book_description}
            chunk1={<Link href={`/author/${history.author_id}`}>Tác giả: {history.author_name}</Link>}
            chunk2 = {<Link href={`/read/${history.chapter_id}`}>Chương {history.chapter_number}: {history.chapter_title}</Link>}
            chunk3={`${new Date(history.timestamp).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' })} - ${new Date(history.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}`}
            cover={`${history.book_cover}`}
        />
    );
}

function FollowComponent({ follow }) {
    return (
        <BigCard
            book_title={follow.book_title}
            book_id={follow.book_id}
            description={follow.book_description}
            chunk1={<Link href={`/author/${follow.author_id}`}>Tác giả: {follow.author_name}</Link>}
            chunk2={follow.latest_chapter 
                ? <Link href={`/read/${follow.latest_chapter.chapter_id}`}>Chương {follow.latest_chapter.chapter_number}: {follow.latest_chapter.chapter_title}</Link>
                : <p>Sách chưa cập nhật chương</p>}
            chunk3={follow.latest_chapter 
                ? <p>{`Cập nhật: ${new Date(follow.latest_chapter.lastupdated).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' })} - ${new Date(follow.latest_chapter.lastupdated).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}`}</p> 
                : <p></p>}
            cover={`${follow.book_cover}`}
        />
    );
}
