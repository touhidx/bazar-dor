"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { updateUser, useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#f8faf7] px-3 py-2.5 text-sm " +
  "placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const { error } = await updateUser({
      name: data.name,
    });

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/sign-in");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করা যায়নি");
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#eef3ec] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 mb-5 text-xs text-gray-500 sm:text-sm">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* User card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-[68px] sm:w-[68px]"
              />
            ) : (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#05893E] text-2xl font-semibold text-white sm:h-[68px] sm:w-[68px]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}

            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                {user?.name}
              </p>
              <p className="truncate text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <Button
            onPress={handleSignOut}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
          >
            <FiLogOut size={14} />
            সাইন আউট
          </Button>
        </div>

        {/* Info card */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 shadow-sm sm:p-5">
          <h2 className="text-base font-semibold text-gray-900">তথ্য</h2>

          <Form
            // key re-mounts the form once the session loads, so defaultValue fills in
            key={user?.name ?? "loading"}
            className="mt-5 flex flex-col gap-4 sm:px-4 sm:pb-3"
            onSubmit={onSubmit}
          >
            <TextField
              isRequired
              name="name"
              defaultValue={user?.name ?? ""}
              validate={(v: string) =>
                v.trim().length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null
              }
            >
              <Label className={labelClass}>নাম</Label>
              <Input className={inputClass} />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
            >
              আপডেট
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
