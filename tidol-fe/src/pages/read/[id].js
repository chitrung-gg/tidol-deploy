import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import ScrollToTopButton from '@/components/ScroolTopButton';

import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        if (!id) return;
        const headers = {
            "Content-Type": "application/json",
        };
        let access_token = localStorage.getItem("access_token");
        if (access_token) headers["authorization"] = `Bearer ${access_token}`;
        
        axios.get(`/api/bookly/chapter/${id}/`, { headers })
            .then(({ data }) => setChapter(data))
            .catch(error => console.error('Error fetching data: ', error))
            .finally(() => setLoading(false));
        }, [id]);

    let title = "Bookly";
    let content = null;

    if (loading) {
        title = "Loading...";
        content = (
            <SkeletonTheme baseColor="#202020" highlightColor="#232323">
                <div className="flex flex-col space-y-4">
                    <Skeleton height={40} />
                    <Skeleton height={20} count={5} />
                </div>
            </SkeletonTheme>
        );
    } else {
        if (chapter) {
            title = chapter.title;
            content = (
                <>
                    <h1 className="text-2xl font-bold mx-auto">{chapter.title}</h1>
                    <p className="text-justify text-2xl" dangerouslySetInnerHTML={{ __html: chapter.content }}></p>
                </>
            )
        } else {
            title = "Connection Error";
            content = (
                <div className="flex flex-col space-y-4">
                    <h1 className="text-2xl font-bold">Ops! Something went wrong</h1>
                </div>
            )
        }
    }

    return (
        <>
            <NextSeo title={title}/>
            <div class="flex flex-col space-y-8 mx-20">
                {content}
            </div>
            <ScrollToTopButton />

        </>
    )
}