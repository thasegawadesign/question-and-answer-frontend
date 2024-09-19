import Header from "@/app/components/header";
import LoginButton from "@/app/components/LoginButton";
import "@/app/globals.css";
import clsx from "clsx";

export default async function Login() {
  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <LoginButton />
      </main>
    </>
  );
}
