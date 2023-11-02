"use client";

import { useState } from "react";
import Link from "next/link";


const Profile = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [username, setUsername] = useState("wendy");
  const [avatar, setAvatar] = useState(
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  //the function was triggered when user submitted the update form
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // password validation
    const isValid = validatePassword(newPassword);

    if (isValid) {
      setPasswordError(null);
    } else {
      setPasswordError("at least 8 characters.");
    }
  };
  //password validation
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };



  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    // const response = await fetch('./utils/updatePassword', {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });
    try{
      const response = await fetch("/api/route.ts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    
    console.log("success");
    const data = await response.json();

    alert(data.message || data.error); // Basic alert to show the result
    }catch{

    }
    
  };
  //js: use to update the password

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
      {/* personal information window */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {/* personal info page */}
        <div className="flex flex-col items-center mb-4">
          {/* avatar window  */}
          <div className="w-40 h-40 rounded-lg mb-3">
            {/* avatar image  */}
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full rounded-lg mb-4 object-cover"
            />
          </div>

          {/* personal information */}
          <h2 className="text-2xl">Bobby</h2>
          <p className="mb-1">Date of Birth: January 1, 2000</p>
          <p className="mb-1">Email: 123456@qq.com</p>
          <p className="mb-1">Phone: 123-456-7890</p>
          <p className="mb-1">Addressline1: xxxxxx</p>
          <span className="mb-1">State: xxxxxx</span>
          <span className="mb-1">City: xxxxxx</span>
          <span className="mb-1">Postcode: xxxxxx</span>
        </div>

        {/* the button is used to update the info */}
        {/* <button
          onClick={() => setIsAvatarModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Avatar
        </button> */}

        {/* the button is used to update the password */}
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button>

        {/* transfer to profile update page */}
        <Link href="/pages/profile/updateUserProfile">
          <button className="bg-blue-500 text-white p-2 rounded-lg  w-full">
            Change Personal Information
          </button>
        </Link>



        {/* this is the modal, which is used to update the password */}
        {isPasswordModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            {/* window warpper */}
            <div className="w-60 h-60 bg-slate-200  rounded-lg">
              <form className="space-y-4 h-60 " onSubmit={handlePasswordSubmit}>
                <div className="flex flex-col justify-around h-60">
                  <label className="text-gray-700 text-bold text-lg mt-3 mb-2">
                    Password Update
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your new password"
                    onChange={handlePasswordChange}
                    className="p-2 border rounded-lg mb-4"
                  />
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                  <button
                    className="h-10 mb-5  rounded-lg bg-sky-500 hover:bg-sky-700 ..."
                    type="submit"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={() => setIsAvatarModalOpen(false)}
                    className="h-10 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mb-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
