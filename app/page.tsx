import { notFound } from "next/navigation";
import Link from 'next/link'

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-2">
      <a href="/login" className="border-2 rounded-md p-4 hover:bg-slate-100">
        Login Page
      </a>
      <a
        href="/user/profile"
        className="border-2 rounded-md p-4 hover:bg-slate-100"
      >
        Profile Page
      </a>
      <a
        href="/crazylogin"
        className="border-2 rounded-md p-4 hover:bg-slate-100"
      >
        Crazy Login Page
      </a>


      <Link href="/pages">trail</Link>

    </div>
  );
}
