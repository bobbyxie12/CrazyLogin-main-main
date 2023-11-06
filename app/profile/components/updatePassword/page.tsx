"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { updatePasswordData } from "@/app/interfaces/user";
import update from "./updatePasswordApi";
import updateDataApi from "./updateDataApi";
import toast, { Toaster } from "react-hot-toast";
import { getCookie,deleteCookie   } from "cookies-next";
import { useRouter } from "next/navigation";

export const UpdatePassword = () => {
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState<number>();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
  );

  useEffect(() => {
    let username = getCookie("username") ?? "";
    //   // username = String(getCookie('username'))
    // console.log(getCookie('username'))
    // const response1 = updateDataApi(username);
    // console.log(response1)
    // const data123 = response1.map(item =>console.log(item))

    updateDataApi(username).then((res) => {
      if (res.message && typeof res.message !== "string") {
        //res.message is object
        console.log(res.message)
        setAvatar(
          res.message.icon === null
            ? "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
            : res.message.icon
        );
        setUsername(
          res.message.username === null ? "Empty" : res.message.username
        );
          // if(typeof(res.message.birthday)!== "string"){
          //    setDob(res.message.birthday === null ? "Empty" : res.message.birthday)
          // }
       
        setAddressline1(
          res.message.addressLine1 === null ? "Empty" : res.message.addressLine1
        );
        setAddressline2(
          res.message.addressLine2 === null ? "Empty" : res.message.addressLine2
        );
        // setDob(res.message.birthday===null? null:res.message.birthday)
        setEmail(res.message.email === null ? "Empty" : res.message.email);
        setPhone(res.message.phone === null ? "Empty" : res.message.phone);
        setCity(res.message.phone === null ? "Empty" : res.message.phone);
        setState(res.message.state === null ? "Empty" : res.message.state);
        setPostcode(
          res.message.postcode === null ? "Empty" : res.message.postcode
        );
      }
    });

    if (true) {
    }
  }, []);

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
    // let username = cookies().get("username");
    if (password.length < 8) {
      return toast("at least 8 character");
    }
    const data: updatePasswordData = { password,username };
    // const datauUername: updatePasswordData = {username};
    const response = await update(data);
    console.log(response.message);
    if (response.message === "success") {
      toast("success to update your password");
    } else {
      toast("fail to update password");
    }
    setPassword("");
    setIsPasswordModalOpen(false);
  };
  //js: use to update the password
  const clickButton = (e: any) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    setPassword("");
  };

  const logout = () => {

    deleteCookie('username')
    deleteCookie('region');
    deleteCookie('password');
    console.log("click")
    router.push('/login/example')

  };

  return (
    <div>
      <Toaster />
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
            <h2 className="text-2xl">{username}</h2>
            <p className="mb-1">Date of Birth: {dob}</p>
            <p className="mb-1">Email: {email}</p>
            <p className="mb-1">Phone: {phone}</p>
            <p className="mb-1">Addressline1: {addressline1}</p>
            <p className="mb-1">Addressline2: {addressline2}</p>
            <span className="mb-1">State: {state}</span>
            <span className="mb-1">City: {city}</span>
            <span className="mb-1">Postcode: {postcode}</span>
          </div>
        </div>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button>
        {/* transfer to profile update page */}
        <Link href="/updateInfo">
          <button className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full">
            Change Personal Information
          </button>
        </Link>

        <button
          onClick={logout}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Log Out
        </button>

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
                    onClick={clickButton}
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
