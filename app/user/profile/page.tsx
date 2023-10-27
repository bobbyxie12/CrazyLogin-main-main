import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="relative w-screen h-screen bg-[url('/images/background.jpg')] bg-cover">
      <div className="absolute left-1/2 -translate-x-1/2 h-screen w-full xl:w-[1280px]  p-8">
        <div className="w-full h-full bg-white flex flex-col items-center justify-center">
          <h1>//todo you will need to design this page on your own</h1>
          <p className="font-bold">requirements:</p>
          <ol className="list-decimal px-8">
            <li>have somewhere to display user avatar.</li>
            <li>
              have somewhere to display user roles. A user can have multiple
              roles. roles content include department name, department region,
              status (formal/intern), and role type (full time/part time/casual)
            </li>
            <li>
              have somewhere able to update firstname, lastname, date of birth,
              email, phone, home address (addressline1, addressline2, city,
              state, postcode). Dont need to implement backend code, just code
              for the front end
            </li>
            <li>
              have somewhere to update password. Dont need to implement backend
              code, just code for the front end
            </li>
            <li>
              preferably use tabs to display different sections, but this is not
              mandatory. you can use any layout you see fit.
            </li>
            <li>best to have: responsive design for mobile view</li>
          </ol>
        </div>
      </div>
    
    </div>
  );
}
