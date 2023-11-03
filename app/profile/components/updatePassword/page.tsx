"use client"
import { useState } from "react";
import Link from "next/link";
import { updatePasswordData } from "@/app/interfaces/user";
import { getCookie } from 'cookies-next';

export const UpdatePassword = (
  {
    onUpdate,
  }:{
    onUpdate:(data:updatePasswordData)=> void
}) => {


  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("wendy");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);    
  const [avatar, setAvatar] = useState(
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
    );
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
    const data:updatePasswordData = {password}
    onUpdate(data)
    setIsPasswordModalOpen(false)
    // console.log(username, password);
    // await fetch("/api/userProfile", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: username, password: password }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));

    // console.log(response)

    // const data = await response.json();

    // alert(data.message || data.error); // Basic alert to show the result
  };
  //js: use to update the password
    const clickButton =()=>{



      setIsPasswordModalOpen(false)
    }

  return (
    <div>
      {/* the button is used to update the info */}
      {/* <button
          onClick={() => setIsAvatarModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Avatar
        </button> */}

      {/* the button is used to update the password */}

      {/* <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button> */}
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
          <div>
            <h2 className="text-2xl">Bobby</h2>
            <p className="mb-1">Date of Birth: January 1, 2000</p>
            <p className="mb-1">Email: 123456@qq.com</p>
            <p className="mb-1">Phone: 123-456-7890</p>
            <p className="mb-1">Addressline1: xxxxxx</p>
            <span className="mb-1">State: xxxxxx</span>
            <span className="mb-1">City: xxxxxx</span>
            <span className="mb-1">Postcode: xxxxxx</span>
          </div>
        </div>

        <button
          onClick={
            () => setIsPasswordModalOpen(true)
          }
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button>
        {/* transfer to profile update page */}
        <Link href="/profile/updateUserProfile">
          <button className="bg-blue-500 text-white p-2 rounded-lg  w-full">
            Change Personal Information
          </button>
        </Link>
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
                  {/* this is the modal, which is used to update the password */}
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
                    onClick={() => setIsPasswordModalOpen(false)}
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
