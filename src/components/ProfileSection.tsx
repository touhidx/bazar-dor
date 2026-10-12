"use client";

import { authClient, signOut } from "@/lib/auth-client";

import Link from "next/link";
import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

const ProfileSection = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="shrink-0">
      {user ? (
        <div className="dropdown dropdown-end">
          {/* Trigger: avatar + name + caret */}
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl p-1 hover:bg-gray-50"
          >
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#05893E] text-sm font-semibold text-white sm:h-10 sm:w-10">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-900 sm:inline">
              {user.name}
            </span>
            <span className="text-[10px] text-gray-500">▾</span>
          </div>

          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
          >
            <p className="truncate text-base font-bold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-gray-900 hover:text-[#05893E]"
              >
                <FiUser className="text-blue-500" size={16} />
                আমার প্রোফাইল
              </Link>

              <button
                onClick={() => signOut()}
                type="button"
                className="flex cursor-pointer items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <FiLogOut size={16} />
                সাইন আউট
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/sign-up">
            <button className="btn btn-sm border-none bg-white sm:btn-md">
              সাইন আপ
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="btn btn-sm bg-[#05893E] text-white sm:btn-md">
              সাইন ইন
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
