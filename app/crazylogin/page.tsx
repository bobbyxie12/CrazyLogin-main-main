import Image from "next/image";
import { Login } from "./_components/Login";

export default function Page() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-full h-full relative bg-[url('/images/background.jpg')] bg-cover flex items-center justify-around gap-2 overflow-hidden">
        <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 text-[96px] font-bold z-10 bg-blue-50 px-4 rounded-xl opacity-50">
          <p className="text-[96px] font-bold z-20 text-orange-800 whitespace-nowrap opacity-0">
            CRAZY NEXT II
          </p>
        </div>
        <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <p className="text-[96px] font-bold z-20 text-orange-800 whitespace-nowrap">
            CRAZY NEXT II
          </p>
        </div>
        <Image
          className="absolute top-16 right-16"
          width={100}
          height={30}
          src="/images/logo.png"
          alt=""
        />
        <Login />
      </div>
    </div>
  );
}
