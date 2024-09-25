import Header from "@/app/components/header";
import LoginButton from "@/app/components/loginButton";
import LogoutButton from "@/app/components/logoutButton";
import "@/app/globals.css";
import { options } from "@/app/options";
import clsx from "clsx";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(options);
  const getUser = async (email: string) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/users?email=${email}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const createUser = async (email: string, provider: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          provider: provider,
        }),
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const user = await getUser(session?.user?.email as string);
  if (!user) {
    await createUser(session?.user?.email as string, "Google");
  }

  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <h1 className={clsx("mb-2 text-green-600")}>
          {session?.user?.name ? `ログイン中 ${session.user.name} さん` : ""}
        </h1>
        <div className={clsx("flex justify-between")}>
          {!user && <LoginButton />}
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
