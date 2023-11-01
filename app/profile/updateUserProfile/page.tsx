"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

//trigger the function when users enter the input
const InfoUpdateForm = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    dob: "",
    email: "",
    phone: "",
    addressline:"",
    dateBox:"",
  });
  // const [dateBox, setDateBox] = useState('');
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  //define the regular expression for phone number
  const telephoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,5})$/;
  //trigger the function when submit the form
  const handleSubmit = (e: any) => {
    // Handle form submission, update user info on server

    // console.log("running")
    const isValidTelephone = telephoneRegex.test(formData.phone);
    setIsValid(isValidTelephone);
    e.preventDefault();
    
   
    //convert the birthday to timestamp 
    const birthdayTimestamp: number = new Date(formData.dateBox).getTime();
    const timestampString: string = birthdayTimestamp.toString();
    //save timstamp into dataform
    setFormData(preState => ({
      ...preState,
      dob:timestampString
    }))

    //testing

    console.log(formData.dob);

    //update the password right here
    // const response = await fetch('/api/updatePassword', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, newPassword })
    // });

    // const data = await response.json();
    // console.log(data);


    // router.push("/profile");




  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <label className="text-2xl text-black text-bold">
          Update your information
        </label>

        {/* form wrapper */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Name</label>
            {/* name input */}
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
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
              required
            />
          </div>
          {/* Email input */}
          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
            />
          </div>

          {/* phone input */}
          <div className="flex flex-col">
            <label className="text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
            />
          </div>

          {!isValid && (
            <p className="text-red-500">
              Please enter a valid telephone number.
            </p>
          )}

          {/* addressline input */}
          <div className="flex flex-col">
            <label className="text-gray-700">addressline</label>
            <input
              type="address"
              name="addressline"
              value={formData.addressline}
              onChange={handleChange}
              className="p-2 border rounded-lg"
              required
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
