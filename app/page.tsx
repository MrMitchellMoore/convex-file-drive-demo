"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  useAuth,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
export default function Home() {
  const organization = useOrganization();

  const user = useUser();

  let orgId = null;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const createFile = useMutation(api.files.createFile);

  const session = useAuth();
  return (
    <div className="flex flex-col gap-10 min-h-screen w-full items-center justify-center bg-slate-100">
      <SignedIn>
        {session.isSignedIn && files && files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div key={file._id} className="bg-white p-2 rounded-md">
                {file.name}
              </div>
            ))}
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="bg-white p-2 rounded-md text-center text-lg font-bold">
          Sign to add files!
        </div>
      </SignedOut>
      <div>
        <Button
          onClick={() => {
            if (!orgId) return;
            createFile({
              name: "Hello World",
              orgId,
            });
          }}
        >
          Click Me
        </Button>
      </div>
    </div>
  );
}
