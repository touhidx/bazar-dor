"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#f8faf7] px-3 py-2.5 text-sm " +
  "placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (error) toast.error("সাইন ইন করা যায়নি");
  };
  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error("সাইন ইন করা যায়নি");
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    if (error) {
      toast.error("সাইন ইন করা যায়নি");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#eef3ec] px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mt-1 mb-6 max-w-sm text-center text-xs text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 shadow-sm sm:p-5">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(v: string) =>
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
                ? "সঠিক ইমেইল ঠিকানা দিন"
                : null
            }
          >
            <Label className={labelClass}>ইমেইল</Label>
            <Input className={inputClass} placeholder="you@example.com" />
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(v: string) =>
              v.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            সাইন ইন
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            onPress={() => handleGoogleSignIn()}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50"
          >
            <FcGoogle size={16} />
            Google দিয়ে চালিয়ে যান
          </Button>
          <Button
            onPress={() => handleGithubSignIn()}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50"
          >
            <FaGithub size={16} />
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-900">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-xs text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;
