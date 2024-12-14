"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.any(),
});

interface UploadDialogProps {
  orgId: string | undefined;
  createFile: ({ name, orgId }: { name: string; orgId: string }) => void;
}

const UploadDialog = ({ orgId, createFile }: UploadDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center my-24 p-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-900 text-white font-bold p-6"
              onClick={() => {
                if (!orgId) return;
                createFile({
                  name: "Hello World",
                  orgId,
                });
              }}
            >
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md md:max-w-lg bg-slate-200 p-6 rounded-md shadow-md gap-4">
            <DialogHeader>
              <DialogTitle className="text-center font-bold text-lg md:text-2xl">
                Upload your file here!
              </DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="File Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadDialog;
