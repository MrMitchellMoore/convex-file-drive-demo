import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="p-4 flex w-full bg-gray-100 border-b border-black">
      <header className="container mx-auto flex gap-2 items-center justify-between">
        <div className="text-lg font-bold">FileDrive</div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>
    </div>
  );
}
