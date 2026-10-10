"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signUp, signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#f8faf7] px-3 py-2.5 text-sm " +
  "placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  const handleSocial = async (provider: "google" | "github") => {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "লগইন করা যায়নি");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#eef3ec] px-4 py-10">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 mb-6 text-center text-xs text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      {/* Card */}
      <div className="w-full max-w-[280px] rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 shadow-sm sm:max-w-sm sm:p-5">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(v: string) =>
              v.trim().length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null
            }
          >
            <Label className={labelClass}>নাম</Label>
            <Input className={inputClass} placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          {/* Email */}
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

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            validate={(v: string) =>
              v.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          {/* Confirm password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(v: string) =>
              v !== password ? "পাসওয়ার্ড দুটি মিলছে না" : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input className={inputClass} placeholder="আবার লিখুন" />
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            onPress={() => handleSocial("google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50"
          >
            <FcGoogle size={16} />
            Google দিয়ে চালিয়ে যান
          </Button>
          <Button
            onPress={() => handleSocial("github")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50"
          >
            <FaGithub size={16} />
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        {/* Switch to sign in */}
        <p className="mt-4 text-center text-xs text-gray-900">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back home */}
      <Link href="/" className="mt-6 text-xs text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignUpPage;
