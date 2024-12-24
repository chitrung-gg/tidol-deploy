import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import moment from 'moment/moment';

import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);

    const [isReviewed, setIsReviewed] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [allReviews, setAllReviews] = useState([]);
    
    useEffect(() => {
        if (!id) return;
        const headers = {
            "Content-Type": "application/json",
        };
        let access_token = localStorage.getItem("access_token");
        if (access_token) headers["authorization"] = `Bearer ${access_token}`;

        setLoading(true);

        Promise.all([
            axios.get(`/api/bookly/book/${id}/`, { headers })
                .then(({ data }) => {
                    setBook(data);
                    setIsFollowed(data.is_followed);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem("access_token");
                    }
                }),

            axios.get(`/api/bookly/review/${id}/`, { headers })
                .then(({ data }) => {
                    if (data) {
                        if (data.my_review) {
                            setRating(data.my_review.score);
                            setReview(data.my_review.comment);
                            setIsReviewed(true);
                        }
                        setAllReviews(data.all_reviews);
                    }
                })
        ]).finally(() => {
            setLoading(false);
        });

        }, [id]);
        
    const handleInputChange = (event) => {
        setReview(event.target.value);
    };
    
    
    
    function sendRequest(method, url, data, headers) {
        return axios({ method, url, data, headers })
        .then(response => {
            if ([200, 201, 204].includes(response.status)) {
                return true;
            }
            throw new Error('Request failed');
        })
        .catch(error => {
            if (error.response){
                if (error.response.status === 401) {
                    localStorage.removeItem("access_token");
                    toast.error("Try to login again");
                }
            } 
            throw error;
        });
    }

    const handleFollowButton = async () => {
        const headers = {
            "Content-Type": "application/json",
        };
        let access_token = localStorage.getItem("access_token");
        if (access_token) headers["authorization"] = `Bearer ${access_token}`;
        else {
            toast.error("You must login first");
            return;
        }
        if (isFollowed) {
            const unfollowPromise = sendRequest('delete', `/api/bookly/follow/`, { book_id: id }, headers)
            .then(success => {
                if (success) {
                        setIsFollowed(false);
                    }
                    return success;
            });
                
            toast.promise(
                unfollowPromise,
                {
                    loading: 'Hủy theo dõi...',
                    success: 'Đã loại bỏ khỏi danh sách theo dõi của bạn',
                error: 'Không thể hủy theo dõi',
            }
            );
        } else {
            const followPromise = sendRequest('post', `/api/bookly/follow/`, { book_id: id }, headers)
            .then(success => {
                if (success) {
                    setIsFollowed(true);
                }
                return success;
            });
                
            toast.promise(
                followPromise,
                {
                    loading: 'Đang theo dõi...',
                    success: 'Đã thêm vào danh sách theo dõi của bạn',
                    error: 'Không thể theo dõi',
                }
            );
        }
    };

    const handleReviewButton = async () => {
        const headers = {
            "Content-Type": "application/json",
        };
        let access_token = localStorage.getItem("access_token");
        if (access_token) headers["authorization"] = `Bearer ${access_token}`;
        else {
            toast.error("You must login first");
            return;
        }
        if (isReviewed){
            const reviewPromise = sendRequest('delete', `/api/bookly/review/${id}/`, {}, headers)
            .then(success => {
                if (success) {
                    setIsReviewed(false);
                }
                setRating(0);
                setReview("");
                window.location.reload();
                return success;
            });

            toast.promise(
                reviewPromise,
                {
                    loading: 'Đang gỡ đánh giá...',
                    success: 'Đã gỡ đánh giá của bạn',
                    error: 'Không thể gỡ đánh giá',
                }
            );
        } else {
            const reviewPromise = sendRequest('post', `/api/bookly/review/${id}/`, {score: rating, comment: review}, headers)
            .then(success => {
                if (success) {
                    setIsReviewed(true);
                }
                return success;
            });

            toast.promise(
                reviewPromise,
                {
                    loading: 'Đang gửi đánh giá...',
                    success: 'Đã gửi đánh giá của bạn',
                    error: 'Không thể gửi đánh giá',
                }
            );

        }
    };
        
        
    let title = "Bookly";
    let content = null;
    if (loading) {
        title = "Loading...";
        content = (
            <SkeletonTheme baseColor="#202020" highlightColor="#232323">
                <Skeleton className="browse-banner !w-[100rempx] bg-zinc-700/20 rounded-lg">
                    
                </Skeleton>
                <div className="flex flex-col space-y-4">
                    <Skeleton height={40} />
                    <Skeleton height={20} count={5} />
                </div>
            </SkeletonTheme>
        );
    } else {
        if (!book) { return; }
        title = book.title;
        content = (
            <>
                <div className="browse-banner !w-[100rempx] bg-zinc-700/20 rounded-lg">
                    <img id="image" src={`/${book.cover}`} className="button-animate browse-image" />
                    <div id="black" className="bg-gradient-to-tr from-zinc-900/20 to-zinc-900/50 browse-black"></div>
                </div>
                <div id="body2" className="block lg:hidden">
                    <div className="flex justify-center">
                        <img alt={book.title} src={`/${book.cover}`} className="flex-shrink-1 rounded-lg w-[250px] h-[380px] relative object-cover bg-cover -mt-32" />
                    </div>
                    <h1 className="text-xl font-semibold text-white text-center mt-3">
                        {book.title}
                    </h1>
                    {/* <div className="grid grid-cols-2 gap-2 py-4 px-8">
                        <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Romance</div>
                        <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Comedy</div>
                        <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Action</div>
                        <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Adventure</div>
                    </div> */}

                    <div className="mt-4">
                        <p className="mt-2 line-clamp-5 text-center w-[450px]">
                            {book.description}    
                        </p>
                    </div>


                    <div className="mt-4 p-8">
                        <h1 className="text-xl text-zinc-200 font-semibold mb-4">Các chương</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {book.chapters.map((chapter, index) => (
                                <Link href={`/read/${chapter.id}`}>
                                    <div key={index} className={`rounded-lg border px-4 py-4 text-center items-center ${chapter.is_read ? 'bg-zinc-700/40 border-green-700' : 'bg-zinc-700/40 border-zinc-700/20'}`}>
                                        <div className="flex justify-between">
                                            <p className="text-[15px] opacity-80">Chương {parseFloat(chapter.chapter_number)}</p>
                                            <div className="flex">
                                                <p className="text-[15px]">
                                                        <i className="fas fa-arrow-right text-gray-500 mr-1"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 p-8">
                        <div class="mt-6 w-full">
                            <h1 class="text-xl text-white opacity-90">Đánh giá</h1>
                            <div class="flex mt-4"> 
                                <div class="flex-shrink-0 w-[3.5rem] h-[3.5rem]">
                                    <img
                                        alt="avatar"
                                        src="/logo.png"
                                        class="rounded-full"
                                    />
                                </div>
                                <div class="w-full ml-5">
                                    <div>
                                        <StarRating rating={rating} setRating={setRating} readOnly={isReviewed}/>
                                    </div>
                                    <textarea
                                        type="text"
                                        value={review}
                                        onChange={handleInputChange}
                                        readOnly={isReviewed}
                                        spellcheck="false"
                                        autocomplete="off"
                                        rows="2"
                                        maxlength="512"
                                        placeholder="Để lại đánh giá của bạn ..."
                                        class="mt-2 focus:text-zinc-500 focus:dark:text-zinc-500 focus:border-zinc-500/100 disable-arrows transition-all duration-200 col-span-6 w-full bg-black/10 hover:bg-black/20 rounded-xl border border-white/10 outline-none py-4 px-6"
                                    />
                                    <p class="hidden" />
                                    <div class="lg:flex items-center justify-end w-full">
                                        <div>
                                            <button onClick={handleReviewButton} class="hover:bg-zinc-600/40 flex text-center justify-center items-center bg-zinc-600/20 backdrop-blur-xl transition-all duration-200 py-2 mt-2 px-6 text-sm rounded-xl text-white">
                                                {isReviewed ? "Gỡ bỏ đánh giá" : "Gửi đánh giá"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                {allReviews.map((review) => (
                                    <div class="mt-5 backdrop-filter backdrop-blur-lg border border-zinc-300/10 text-zinc-300 transition-all duration-200 rounded-lg p-5">
                                        <div class="flex w-full">
                                            <div class="flex-shrink-0 w-[4rem] h-[4rem]">
                                                <img
                                                    alt="logo"
                                                    class="rounded-full"
                                                    src="https://avatars.githubusercontent.com/u/81900902?v=4"
                                                />
                                            </div>
                                            <div class="ml-3 w-full">
                                                <div class="flex items-center">
                                                    <p class="text-lg font-medium mr-2">{review.user_name}</p>
                                                    <p class="ml-2 text-xs text-white/50">{moment(new Date()).from(review.timestamp)}</p>

                                                    {/* <div class="ml-auto">
                                                        <button class="hover:bg-zinc-600/40 flex text-center justify-center items-center bg-zinc-600/20 backdrop-blur-xl transition-all duration-200 py-2 mt-2 px-6 text-sm rounded-xl text-white">
                                                            <i class="fas fa-reply mr-2"></i>
                                                            <p class="text-xs">Reply</p>
                                                        </button>
                                                    </div> */}
                                                </div>
                                                <p class="text-sm">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div id="body" className="hidden lg:block">
                    <div id="user-info" className="flex -mt-2 space-x-8">
                        <div className="ml-12 -mt-24">
                            <img alt={book.title} src={`/${book.cover}`} className="flex-shrink-1 rounded-lg w-[250px] min-h-[280px] max-h-[340px] relative object-cover bg-cover" />
                            <div className="mt-2">
                                <div className="flex space-x-2 w-[250px]">
                                    <Tippy placement="bottom" arrow={false} theme="dark">
                                        <div onClick={() => handleFollowButton()} className={`w-full mt-2 py-2.5 group button-animate p-2 px-6 text-md flex text-center justify-center items-center cursor-pointer rounded-lg bg-zinc-700/30 border border-zinc-700/10 hover:bg-zinc-700/40`}>
                                            {isFollowed ?
                                                <div> 
                                                    <i className="fas fa-check mr-2 mt-0.5 text-xl button-animate"></i> 
                                                    <p className="mr-2 button-animate mt-0.5 text-sm text-white">Hủy theo dõi sách</p>
                                                </div> : 
                                                <div>
                                                    <i className="fas fa-plus mr-2 mt-0.5 text-xl button-animate"></i>
                                                    <p className="mr-2 button-animate mt-0.5 text-sm text-white">Theo dõi sách</p>
                                                </div>
                                            }       
                                        </div>
                                    </Tippy>
                                    {/* <Tippy content={"Yakında..."} placement="bottom" arrow={false} theme="dark">
                                        <div onClick={() => like()} className={`mt-2 px-6 py-2.5 group button-animate  text-md flex text-center justify-center items-center cursor-pointer rounded-lg bg-zinc-700/30 border border-zinc-700/10 hover:bg-zinc-700/40`}>
                                            <i className={`fas fa-heart text-red-600 mt-0.5 text-lg button-animate`}></i>
                                            </div>
                                    </Tippy> */}
                                </div>
                                {/* <div className="mt-4">
                                    <h1 className="text-lg text-gray-100 font-semibold mb-2">Genre</h1>
                                    <div className="grid grid-cols-2 gap-2 ">
                                    <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Action</div>
                                    <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Comedy</div>
                                    <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Adventure</div>
                                    <div className="bg-zinc-700/30 border-zinc-700/20 border px-3 cursor-pointer text-sm py-1 text-center items-center rounded-md">Romance</div>
                                    </div>
                                </div> */}
                                <div className="mt-4">
                                    <h1 className="text-lg text-gray-100 font-semibold mb-2">Thông tin chi tiết</h1>

                                    <div className="bg-zinc-700/20 mt-2 w-full rounded-lg border border-zinc-700/20 px-4 space-y-4 py-4 text-center items-center">
                                        <div className="flex justify-between">
                                            <p className="text-[15px] opacity-80">Tiêu đề</p>
                                            <div className="flex">
                                                <p className="text-[15px]">{book.title}</p>
                                            </div>
                                        </div>
                                        <Link href={`/author/${book.author}`} className="flex justify-between">
                                            <p className="text-[15px] opacity-80">Tác giả</p>
                                            <div className="flex">
                                                <p className="text-[15px]">{book.author_name}</p>
                                            </div>
                                        </Link>
                                        <div className="flex justify-between">
                                            <p className="text-[15px] opacity-80">Lượt xem</p>
                                            <div className="flex">
                                                <p className="text-[15px]">
                                                    {book.chapters.reduce((total, chapter) => total + chapter.viewcount, 0)} lượt
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-4xl">
                            <h1 className="text-4xl font-semibold text-white">
                                {book.title}
                            </h1>
                            <div className="mt-4">
                                <h1 className="text-xl text-zinc-200 font-semibold">Mô tả</h1>
                                <p className="mt-2 line-clamp-3">
                                    {book.description}
                                </p>
                            </div>

                            <div className="mt-4">
                                <h1 className="text-xl text-zinc-200 font-semibold mb-4">Các chương</h1>
                                {/** Chapter card */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {book.chapters.map((chapter, index) => (
                                        <Link href={`/read/${chapter.id}`}>
                                            <div key={index} className={`rounded-lg border px-4 py-4 text-center items-center ${chapter.is_read ? 'bg-zinc-700/40 border-green-700' : 'bg-zinc-700/40 border-zinc-700/20'}`}>
                                                <div className="flex justify-between">
                                                    <p className="text-[15px] opacity-80">Chương {parseFloat(chapter.chapter_number)}</p>
                                                    <div className="flex">
                                                        <p className="text-[15px]">
                                                                <i className="fas fa-arrow-right text-gray-500 mr-1"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <div class="mt-6 w-full">
                                    <h1 class="text-xl text-white opacity-90">Đánh giả</h1>
                                    <div class="flex mt-4">
                                        <div class="flex-shrink-0 w-[3.5rem] h-[3.5rem]">
                                            <img
                                                alt="avatar"
                                                src="/logo.png"
                                                class="rounded-full"
                                                />
                                        </div>
                                        <div class="w-full ml-5" >
                                            <div className="-mt-[2px]">
                                                <StarRating rating={rating} setRating={setRating} readOnly={isReviewed}/>
                                            </div>
                                            <div class="w-full">
                                                <textarea
                                                    type="text"
                                                    value={review}
                                                    onChange={handleInputChange}
                                                    readOnly={isReviewed}
                                                    spellcheck="false"
                                                    autocomplete="off"
                                                    rows="2"
                                                    maxlength="512"
                                                    placeholder="Để lại suy nghĩ của bạn ..."
                                                    class="mt-2 focus:text-zinc-500 focus:dark:text-zinc-500 focus:border-zinc-500/100 disable-arrows transition-all duration-200 col-span-6 w-full bg-black/10 hover:bg-black/20 rounded-xl border border-white/10 outline-none py-4 px-6"
                                                    />
                                                <p class="hidden" />
                                                <div class="lg:flex items-center justify-end w-full">
                                                    <div>
                                                        <button onClick={handleReviewButton} class="hover:bg-zinc-600/40 flex text-center justify-center items-center bg-zinc-600/20 backdrop-blur-xl transition-all duration-200 py-2 mt-2 px-6 text-sm rounded-xl text-white">
                                                            {isReviewed ? "Gỡ bỏ đánh giá" : "Gửi đánh giá"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        {allReviews.map((review) => (
                                            <div class="mt-5 backdrop-filter backdrop-blur-lg border border-zinc-300/10 text-zinc-300 transition-all duration-200 rounded-lg p-5">
                                                    <div class="flex w-full">
                                                        <div class="flex-shrink-0 w-[4rem] h-[4rem]">
                                                            <img
                                                                alt="logo"
                                                                class="rounded-full"
                                                                src="https://avatars.githubusercontent.com/u/81900902?v=4"
                                                            />
                                                        </div>
                                                        <div class="ml-3 w-full">
                                                            <div class="flex items-center">
                                                                <StarRating className="mr-2" rating={review.score} readOnly={true}/>
                                                                <p class="ml-2 text-lg font-medium mr-2">{review.user_name}</p>
                                                                <p class="ml-2 text-xs text-white/50">{moment(new Date()).from(review.timestamp)}</p>
                                                                {/* <div class="ml-auto">
                                                                    <button class="hover:bg-zinc-600/40 flex text-center justify-center items-center bg-zinc-600/20 backdrop-blur-xl transition-all duration-200 py-2 mt-2 px-6 text-sm rounded-xl text-white">
                                                                        <i class="fas fa-reply mr-2"></i>
                                                                        <p class="text-xs">Reply</p>
                                                                    </button>
                                                                </div> */}
                                                            </div>
                                                            <p class="text-sm">
                                                                {review.comment}
                                                            </p>
                                                        </div>
                                                    </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NextSeo title={title} />

            <div className="max-w-7xl pt-12 mx-auto">
                {content}
            </div>
        </>
    )
}


const Star = ({ onClick, filled }) => (
    <svg onClick={onClick} className="h-6 w-6 cursor-pointer" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15.364l-3.72 2.595a1 1 0 01-1.447-1.054l.7-4.242-3.15-3.22a1 1 0 01.568-1.683l4.1-.633 1.85-3.946a1 1 0 011.8 0l1.85 3.946 4.1.633a1 1 0 01.568 1.683l-3.15 3.22.7 4.242a1 1 0 01-1.447 1.054L12 15.364z" />
    </svg>
);

const StarRating = ({ rating, setRating, readOnly }) => {
    return (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
        <Star key={i} filled={i < rating} onClick={readOnly ? null : () => setRating(i + 1)} />
        ))}
    </div>
    );
};
