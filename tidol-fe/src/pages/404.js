import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl leading-normal md:leading-relaxed mb-2 text-white text-center">
                        404 - Page Not Found
                    </h1>
                    <p className="mb-8 text-center text-white">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <div className="w-full text-center">
                        <Link href="/" className="inline-block px-6 py-3 text-xs font-medium leading-6 text-center text-white uppercase transition bg-cyan-600 rounded shadow ripple hover:shadow-lg hover:bg-cyan-800 focus:outline-none">
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}