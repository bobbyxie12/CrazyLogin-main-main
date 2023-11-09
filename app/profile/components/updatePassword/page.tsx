"use client";
import { useState, useEffect,useCallback } from "react";
import Link from "next/link";
import { updatePasswordData } from "@/app/interfaces/user";
import update from "./updatePasswordApi";
import updateDataApi from "./updateDataApi";
import toast, { Toaster } from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/infoData/slice";
import { throttle } from 'lodash';

export const UpdatePassword = () => {
  const router = useRouter();
  // const dispatch = useDispatch();

  // const [username, setUsername] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<string | number | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("null");
  const [newPassword, setNewPassword] = useState("");
  const [roleData,setRoleData] = useState([
    {
      roleType:'null' ,
      status:'null',
      department:'null',
      position:'null',
    }
  ])
  // const [username, setUsername] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
  );

  let username = getCookie("username") ?? "";
  let oldPassword = getCookie("password") ?? "";

  //refresh the page, the info data will update
    useEffect(() => {
      
    },[])


  useEffect(() => {
    let username = getCookie("username") ?? "";
    updateDataApi(username).then((res) => {
      if (res.message && typeof res.message !== "string") {
        console.log(res.message.roles);
        //get the roles 
        

        if(res.message.roles && typeof res.message.roles !== "string"){
          const roles = res.message.roles
   
            roles.map(obj => {
              
              setRoleData(() => 
                [
                  {
                    roleType:obj.roleType,
                    status:obj.status,
                    department:obj.department,
                    position:obj.position,
                  }
                ]
              )
            })    
          // console.log(roleData.length , '123123123')
        }


        // set birthday info
        if ("dob" in res.message) {
          const dob = res.message.dob;
          // console.log(dob)
          // console.log(res.message.dob)
          if (dob) {
            const date = new Date(+dob);
            console.log(date)
            console.log(typeof date);
            // Checking if the date is valid
            let Newdob = date.toISOString().split("T")[0];
            setDob(Newdob);
          } else {
            // Handle invalid date
            console.error("Invalid date string:", dob);
          }
        } else {
          setDob(
            "null"
          );
          // Handle the case where dob is not a string or is missing
          console.error("dob is missing or not a string:", dob);
        }

        if (
          "preferName" in res.message &&
          typeof res.message.preferName == "string"
        ) {
          setFirstName(
            res.message.preferName === null ? "XXX" : res.message.preferName
          );
        }

        setLastName(
          res.message.lastName === null ? "XXX" : res.message.lastName
        );
        setAvatar(
          res.message.icon === null
            ? "https://miro.medium.com/v2/resize:fit:720/format:webp/1*YMJDp-kqus7i-ktWtksNjg.jpeg"
            : res.message.icon
        );
        // setUsername(
        //   res.message.username === null ? "Empty" : res.message.username
        // );

        setAddressline1(
          res.message.addressLine1 === null ? "null" : res.message.addressLine1
        );
        setAddressline2(
          res.message.addressLine2 === null ? "null" : res.message.addressLine2
        );
        // setDob(res.message.birthday===null? null:res.message.birthday)
        setEmail(res.message.email === null ? "null" : res.message.email);
        setPhone(res.message.phone === null ? "null" : res.message.phone);
        setCity(res.message.phone === null ? "null" : res.message.phone);
        setState(res.message.state === null ? "null" : res.message.state);
        setPostcode(res.message.postcode === null ? "null" : res.message.postcode);

      }
    });
  }, []);


  // password validation function
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
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

  // the password update function
  const handlePasswordSubmit = async (e: any) => {
    console.log("debounce function run");
    e.preventDefault();
    // let username = cookies().get("username");
    if (newPassword.length < 8) {
      return toast("at least 8 character");
    }
    const data: updatePasswordData = { newPassword, oldPassword, username };
    // const datauUername: updatePasswordData = {username};
    const response = await update(data);

    if (response.message === "success") {
      toast("success to update your password");
      setNewPassword("");
      setIsPasswordModalOpen(false);
      deleteCookie("username");
      deleteCookie("region");
      deleteCookie("password");
      router.push("./login/example");
    } else {
      toast("fail to update password");
      setNewPassword("");
      setIsPasswordModalOpen(false);
    }
  };

  //modal close function
  const clickButton = (e: any) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    setNewPassword("");
  };

  //logout function
  const logout = () => {
    deleteCookie("username");
    deleteCookie("region");
    deleteCookie("password");
    console.log("click");
    router.push("/login/example");
  };
//debounce function 
const debouncedSubmit = throttle(handlePasswordSubmit, 500);//call the function every 0.5 sec
  return (
    <div>
      <Toaster />
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
            {roleData.map((role, index) => (
              <div key={index} className="p-4 border rounded shadow-sm">
                <h3 className="font-bold text-lg">{role.position}</h3>
                <p>Department: {role.department}</p>
                <p>Status: {role.status}</p>
                <p>Type: {role.roleType}</p>
              </div>
            ))}
            <h2 className="text-2xl">
              {firstName} {lastName}
            </h2>

            <p className="mb-1">Date of Birth: {dob}</p>
            <p className="mb-1">Email: {email}</p>
            <p className="mb-1">Phone: {phone}</p>
            <p className="mb-1">Addressline1: {addressline1}</p>
            <p className="mb-1">Addressline2: {addressline2}</p>
            <span className="mb-1 pr-2">State: {state}</span>
            <span className="mb-1">City: {city}</span>
            <p className="mb-1">Postcode: {postcode}</p>
          </div>
        </div>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mb-2 w-full"
        >
          Change Password
        </button>
        {/* transfer to profile update page */}
        <Link
          href={{
            pathname: "/updateInfo",
            query: {
              firstName,
              lastName,
              dob,
              email,
              phone,
              addressline1,
              addressline2,
              city,
              state,
              postcode,
            },
          }}
        >
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
              <form className="space-y-4 h-60 " onSubmit={debouncedSubmit}>
                <div className="flex flex-col justify-around h-60">
                  <label className="text-gray-700 text-bold text-lg mt-3 mb-2">
                    Password Update
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newPassword}
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
