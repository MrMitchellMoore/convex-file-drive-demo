"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  return (
    <div className="flex flex-col gap-10 min-h-screen w-full items-center justify-center bg-slate-100">
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
      {files && files.length > 0 ? (
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <div key={file._id} className="bg-white p-2 rounded-md">
              {file.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-2 rounded-md text-center text-lg font-bold">
          No files found
        </div>
      )}
      <div>
        <Button
          onClick={() => {
            createFile({
              name: "Hello World",
            });
          }}
        >
          Click Me
        </Button>
      </div>
    </div>
  );
}
