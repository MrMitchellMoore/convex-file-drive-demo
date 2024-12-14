"use client";

import UploadDialog from "@/components/uploadDialog";
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

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const createFile = useMutation(api.files.createFile);

  const session = useAuth();
  return (
    <main className="h-full w-full flex flex-col items-center justify-center border-2 border-red-500">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold my-8">Your Files</h1>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="flex w-full h-full my-8">
          <SignedIn>
            <div className="flex w-full">
              {session.isSignedIn && files && files.length > 0 && (
                <div className="bg-slate-400 p-6 rounded-md font-bold text-lg gap-4 w-1/2">
                  {files.map((file) => (
                    <div
                      key={file._id}
                      className="bg-white p-2 rounded-md gap-10 my-8 flex flex-col items-center justify-center space-y-4 border-2 border-slate-900 shadow-md"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <UploadDialog orgId={orgId} createFile={createFile} />
          </SignedIn>

          <SignedOut>
            <div className="bg-white p-6 rounded-md font-bold text-lg shadow-md">
              Sign in to add files!
            </div>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
