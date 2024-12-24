import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { NextSeo } from "next-seo";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import MiniCard from "@/components/Card/Mini";
import MangaCard from "@/components/Card/NormalCard";
import SlideCard from '@/components/Card/SlideCard';
import NormalCard from "@/components/Card/NormalCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/bookly/gethomepage/`)
      .then(res => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <>
      <NextSeo title={"Home"} />
      <div className="flex flex-col items-center justify-center px-10 -mt-8 lg:-mt-0 mb-24">
        <div className="w-full">



          {/* CAROUSEL */}

          <div className="relative mt-12 px-6 mx-auto">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              modules={[Autoplay, Pagination]}
              className="latestt"
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
                enabled: true
              }}
            >
              {loading ? Array.from(Array(5).keys()).map((d) => (
                <>
                  <SwiperSlide key={d}>
                    <SkeletonComponent />
                  </SwiperSlide>
                </>
              )) : 
              data.sportlight && data.sportlight.map(item => (
                <SwiperSlide key={item.id}>
                  <SlideCard item={item}
                    id = {item.id} 
                    title = {item.title}
                    description = {item.description}
                    cover = {`/${item.cover}`}
                  />
                </SwiperSlide>
              ))}

            </Swiper>
          </div>

          {/* Last Added Chapters */}
          <div className="mt-32 lg:ml-0 -ml-4">
            <div className="flex justify-between">
              <div id="title">
                <h1 className="text-2xl font-semibold">
                  Cập nhật chương mới nhất
                </h1>
              </div>
            </div>
            <div className="mt-4">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}

                modules={[Autoplay, Pagination]}
                className="historyManga"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
              >
                {loading ? Array.from(Array(5).keys()).map((d) => (
                  <>
                    <SwiperSlide key={d}>
                      <SkeletonComponent />
                    </SwiperSlide>
                  </>
                )) : 
                data.last_updated_books && data.last_updated_books.map(item => (
                  <SwiperSlide key={item.id}>
                    <NormalCard item={item}
                      id = {item.id} 
                      title = {item.title}
                      description = {item.description}
                      cover = {`/${item.cover}`}
                      chunk1 = {item.author_name}
                      chunk2 = {`${item.viewcount} lượt xem`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* POPULAR BOOKS */}
          <div className="mt-16 lg:ml-0 -ml-4">
            <div className="flex justify-between">
              <div id="title">
                <h1 className="text-2xl font-semibold">
                  Nổi bật
                </h1>
              </div>
            </div>
            <div className="mt-4">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}

                modules={[Autoplay, Pagination]}
                className="populerManga"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
              >
                {loading ? Array.from(Array(5).keys()).map((d) => (
                  <>
                    <SwiperSlide key={d}>
                      <SkeletonComponent />
                    </SwiperSlide>
                  </>
                )) : 
                data.popular_books && data.popular_books.map(item => (
                  <SwiperSlide key={item.id}>
                    <MiniCard item={item}
                      id = {item.id} 
                      title = {item.title}
                      description = {item.description}
                      cover = {`/${item.cover}`}
                      chunk1 = {item.author_name}
                      chunk2 = {`${item.viewcount} lượt xem`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* LAST ADDED BOOKS */}
          <div className="mt-8 lg:ml-0 -ml-4">
            <div className="flex justify-between">
              <div id="title">
                <h1 className="text-2xl font-semibold">
                  Sách mới thêm
                </h1>
              </div>
            </div>
            <div className="mt-4">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}

                modules={[Autoplay, Pagination]}
                className="latestManga"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
              >
                {loading ? Array.from(Array(5).keys()).map((d) => (
                  <>
                    <SwiperSlide key={d}>
                      <SkeletonComponent />
                    </SwiperSlide>
                  </>
                )) : 
                data.last_added_books && data.last_added_books.map(item => (
                  <SwiperSlide key={item.id}>
                    <NormalCard item={item}
                      id = {item.id} 
                      title = {item.title}
                      description = {item.description}
                      cover = {`/${item.cover}`}
                      chunk1 = {item.author_name}
                      chunk2 = {`${item.viewcount} lượt xem`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  )
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
