"use client";

import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const [avatar, setAvatar] = useState(
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  //js: use to upload avatar
  const handleAvatarUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //js: use to update the password
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
      {/* personal information window */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {/* personal info page */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-13 h-13 rounded-lg">
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-lg mb-4 bg-cover "
            />
          </div>

          <h2 className="text-2xl">Bobby</h2>
          <p>Date of Birth: January 1, 2000</p>
          <p>Email: 123456@qq.com</p>
          <p>Phone: 123-456-7890</p>
        </div>

        {/* the button is used to update the info */}
        <button
          onClick={() => setIsAvatarModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Avatar
        </button>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button>

        <Link href="/profile/components">
          <button className="bg-blue-500 text-white p-2 rounded-lg  w-full">
            Change Personal Information
          </button>
        </Link>


        {/* this is the modal, which is used to update the avatar */}
        {isAvatarModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg flex item-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              />
              <div>
                <button
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="text-red-500 mb-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* this is the modal, which is used to update the password */}
        {isPasswordModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
  

            <form className="space-y-4 ">
              <div className="flex flex-col">
                <label className="text-gray-700">password</label>
                <input
                  type="text"
                  name="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border rounded-lg"
                />
              </div>
            </form>

            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="bg-sky-500 hover:bg-sky-700 ..."
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
