import Link from "next/link";

export default function SlideCard(props) {
    return (
        <>

            <div
                style={{
                    background: `linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)) 0% 0% / cover, url('${props.cover}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                className="slidesr slider-item relative overflow-hidden min-w-full"
            >
                <div className="px-12 -mt-12">
                    <h1 className="mt-6 text-5xl font-bold text-white">{props.title}</h1>

                    <p className="text-light mt-4 text-left line-clamp-2">
                        {props.description}    
                    </p>
                    <div id="buttons" className="flex space-x-4 mt-6">
                        <Link href={`/book/${props.id}`}>
                            <div className={`button-animate p-2 px-6 text-sm flex items-center text-center justify-center cursor-pointer mt-2 rounded-lg bg-zinc-700/40 border border-zinc-700/20 hover:bg-zinc-700/60`}>
                                <p>Xem chi tiết</p><i className={`fa fa-circle-info text-xl ml-2`}></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}