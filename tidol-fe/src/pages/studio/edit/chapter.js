import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo title="Edit Chapter" />
      <div className="lg:px-24 mx-auto justify-center lg:mt-8 pt-10">
        <div className="flex flex-row">
          <div className="flex flex-col grow w-3/4 gap-4 mr-20">

            {/* Chapter title input */}
            <p className="text-lg">Chapter title</p>
            <input type="text" className="w-full bg-zinc-700/20 px-6 border-3 border-zinc-200"/>
          </div>

            {/* Chapter number input */}
          <div className="flex flex-col grow w-1/4 gap-4">
            <p className="text-lg">Chapter Number</p>
            <input type="text" className="w-1/2 bg-zinc-700/20 px-6 border-3 border-zinc-200"/>
          </div>
        </div>

        {/* Chapter content input */}
        <div className="flex flex-col mt-4 mb-8">
          <p className="text-lg">Chapter Content</p>
          <p className="text-sm">Enter content as HTML code</p>
          <textarea className="w-full min-h-[300px] bg-zinc-700/20 px-6 mt-2 border-3 border-zinc-200 text-wrap h-auto grow"/>
        </div>

        {/* Plz add action */}
        <div className="button-animate cursor-pointer hover:bg-zinc-700/60 h-[40px] w-[400px] bg-zinc-700/20 mx-6 my-2 rounded justify-center flex self-center">
          <p className="self-center text-lg">Save Changes</p>
        </div>
      </div>
    </>
  )
}