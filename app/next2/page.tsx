import { notFound } from "next/navigation";
import { getAuthUser } from "../utils/helper";
import { LogoutButton } from "./_components/LogoutButton";

export default async function Page({ params }: { params: { slug: string } }) {
  let user = await getAuthUser("/user/list");
  if (!user) return <p>No Access</p>;

  return (
    <div>
      You are login as {user.username}
      <LogoutButton />
    </div>
  );
}
