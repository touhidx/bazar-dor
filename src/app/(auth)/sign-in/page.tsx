"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#f8faf7] px-3 py-2.5 text-sm " +
  "placeholder:text-gray-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-900";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toast when a protected route sends the user here
  useEffect(() => {
    if (searchParams.get("msg") === "login-required") {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    setLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  };

  const handleSocial = async (provider: "google" | "github") => {
    const { error } = await signIn.social({
      provider,
      callbackURL: redirectTo,
    });
    if (error) toast.error(error.message || "সাইন ইন করা যায়নি");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#eef3ec] px-4 py-10">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mt-1 mb-6 max-w-sm text-center text-xs text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 shadow-sm sm:p-5">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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

          {/* Password with show/hide */}
          <TextField
            isRequired
            name="password"
            validate={(v: string) =>
              v.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <InputGroup className="rounded-lg border border-gray-200 bg-[#f8faf7]">
              <InputGroup.Input
                className="w-full bg-transparent px-3 py-2.5 text-sm placeholder:text-gray-500 focus:outline-none"
                type={isVisible ? "text" : "password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
              <InputGroup.Suffix className="pe-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={
                    isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="mt-1 text-xs text-red-600" />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
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

        {/* Switch to sign up */}
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

      {/* Back home */}
      <Link href="/" className="mt-6 text-xs text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

// useSearchParams needs a Suspense boundary, otherwise `next build` fails
const SignInPage = () => (
  <Suspense fallback={null}>
    <SignInForm />
  </Suspense>
);

export default SignInPage;
