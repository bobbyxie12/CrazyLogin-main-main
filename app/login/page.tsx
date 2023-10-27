import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="relative w-screen h-screen bg-[url('/images/background.jpg')] bg-cover">
      <div className="absolute right-0 h-screen w-full lg:w-1/2 xl:w-[800px]  p-8">
        <div className="w-full h-full bg-white flex flex-col items-center justify-center">
          //todo
          <a
            href="/login/example"
            className="p-4 rounded-md hover:bg-slate-100 duration-300"
          >
            View Example
          </a>
        </div>
      </div>
    </div>
  );
}
