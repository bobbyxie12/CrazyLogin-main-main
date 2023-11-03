import { UpdatePassword } from "./components/updatePassword/page";
import { UserCollection } from "@/app/db/db";
import { updatePasswordData } from "@/app/interfaces/user";
import { hashPassword } from "@/app/utils/utils";

const Profile = () => {
  // const [username, setUsername] = useState("wendy");

  async function handleUpdatePassword(data: updatePasswordData) {
    "use server";
    // let password = data.password
    let username = "wendy";
    let password = "123456789";
    let newPassword = hashPassword(String(password));
    const result = await UserCollection.updateOne(
      { username },
      { $set: { password: newPassword } }
    );

  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('/images/background.jpg')]">
      <UpdatePassword

      onUpdate={handleUpdatePassword}
      />
    </div>
  );
};

export default Profile;
