"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import handleUpdatePassword from "./updateInfoAPI";
import { updateInfo } from "@/app/interfaces/user";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import updateDataApi from "../profile/components/updatePassword/updateDataApi";
import { useSearchParams } from 'next/navigation'

//trigger the function when users enter the input
const InfoUpdateForm = () => {
  interface ApiResponse {
    message:
      | {
          firstName?: string; // The firstName property is optional
          // ... include other user properties
        }
      | string;
  }

  const router = useRouter();
  const searchParams = useSearchParams()
  // const search = searchParams.get('firstName')
  
  // console.log(search)
  // const query = router.query.firstName;

  let username = getCookie("username") ?? "";
  let password = getCookie("password") ?? "";
  const [formData, setFormData] = useState({
    firstName: searchParams.get('firstName'),
    lastName: searchParams.get('lastName'),
    dob: null,
    email: searchParams.get('email'),
    phone: searchParams.get('phone'),
    addressline1: searchParams.get('addressline1'),
    addressline2: searchParams.get('addressline2'),
    city: searchParams.get('city'),
    state: searchParams.get('state'),
    postcode: searchParams.get('postcode'),
    dateBox: '',
  });

  // useEffect(() => {
  //   //this function is used to prefill with the existing user data
  //   updateDataApi(username).then((res) => {
  //     if (res.message && typeof res.message !== "string") {
  //       setFormData({ ...formData, firstName: 'res.message.firstName' || ''});

  //     }
  //   });
  // }, []);







  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || null, // Set to null if the input is empty
    }));
  };

  // const timeStamp = () => {
  //   const birthdayTimestamp: number = new Date(formData.dateBox).getTime();
  //   const timestampString: string = birthdayTimestamp.toString();
  //   //save timstamp into dataform
  //   setFormData({ ...formData, dob: timestampString });

  //   console.log("1");
  // };
  //trigger the function when submit the form
  const handleSubmit = (e: any) => {
    // Handle form submission, update user info on server
    e.preventDefault();
    // console.log("running")
    const birthdayTimestamp: number = new Date(formData.dateBox).getTime();

    //save timstamp into dataform
    const updatedFormData = { ...formData, dob: birthdayTimestamp };
    //convert the birthday to timestamp
    console.log(updatedFormData);
    handleUpdatePassword(updatedFormData, username, password);
    console.log("2");
    toast("success to update");
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <label className="text-2xl text-black text-bold">
          Update your information
        </label>

        {/* form wrapper */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">First Name</label>
            {/* name input */}
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Last Name</label>
            {/* name input */}
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          {/* Date of Birth input */}
          <div className="flex flex-col">
            <label className="text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateBox"
              value={formData.dateBox}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>
          {/* Email input */}
          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          {/* phone input */}
          <div className="flex flex-col">
            <label className="text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          {/* addressline input */}
          <div className="flex flex-col">
            <label className="text-gray-700">addressline1</label>
            <input
              type="address"
              name="addressline1"
              value={formData.addressline1 || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>
          {/* addressline input */}
          <div className="flex flex-col">
            <label className="text-gray-700">addressline2</label>
            <input
              type="address"
              name="addressline2"
              value={formData.addressline2 || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Postcode</label>
            <input
              type="Postcode"
              name="postcode"
              value={formData.postcode || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoUpdateForm;
