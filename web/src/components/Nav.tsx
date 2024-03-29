import BrandIcon from "./icons/BrandIcon";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useState } from "react";
import { ElementProps } from "../types/props";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "./buttons/Button";
import SignInButton from "./buttons/SignInButton";
import ProfileIcon from "./icons/ProfileIcon";

function PrimaryMenu() {
  return (
    <ul className="col center justify-center md:flex-row">
      <li className="m-2">
        <Link href="/">Home</Link>
      </li>
      <li className="m-2">
        <Link href="/events">Events</Link>
      </li>
      <li className="m-2">
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}

function SecondaryMenu(props: ElementProps) {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session?.user?.id)
    return (
      <ul className={props.className}>
        <li className="m-2">
          <Link href={`/profile/${session.user.id}`}>
            <span>
              <ProfileIcon className="cursor-pointer text-3xl" />
            </span>
          </Link>
        </li>
        <li className="m-2">
          <Button className="secondary" onClick={() => signOut()}>
            Sign Out
          </Button>
        </li>
      </ul>
    );

  return (
    <ul className={props.className}>
      <li className="m-2">
        <SignInButton />
      </li>
      <li className="m-2">
        <Button className="primary" href="/auth/register">
          Sign Up
        </Button>
      </li>
    </ul>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll("#nav li");

    links.forEach((link) =>
      link.addEventListener("click", () => setIsOpen(false))
    );
  }, []);

  return (
    <nav id="nav" className="fixed top-0 left-0 z-50 w-screen bg-primary">
      <div className="row center w-screen justify-between p-2 md:p-1 md:px-4">
        <BrandIcon href="/" className="h-10 w-10 sm:h-14 sm:w-14" />
        <div onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="cursor-pointer text-3xl md:hidden" />
          <SecondaryMenu className="center hidden md:flex md:flex-row" />
        </div>
        <div
          className={`col center absolute top-0 left-0 
        -z-10 w-full justify-center overflow-hidden bg-primary transition-all ${
          isOpen ? "h-screen" : "h-0"
        } md:left-1/2 md:top-1/2 md:z-10 md:h-fit 
        md:w-fit md:-translate-x-1/2 md:-translate-y-1/2`}
        >
          <PrimaryMenu />
          <SecondaryMenu className="center flex flex-col md:hidden" />
        </div>
      </div>
    </nav>
  );
}
