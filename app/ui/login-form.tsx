'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Head from "next/head";
import {KilnLogo} from "@/app/ui/KilnLogo";
import Link from "next/link";
import React from "react";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <Head>
            <title>Welcome to KILN</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <KilnLogo />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to KILN
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We just need you to verify some information for us real quick
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form action={dispatch} className="space-y-3">
                  <div key="email">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          required
                      />
                    </div>
                  </div>
                <div key="email">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        minLength={6}
                    />
                  </div>
                </div>
                <LoginButton />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                  {errorMessage && (
                      <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                      </>
                  )}

                </div>
              </form>
            </div>
          </div>
        </div>

  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
      <Button      className="w-full py-2 px-4 bg-[#2C5A5E] text-white rounded-md flex items-center justify-center" aria-disabled={pending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
  );
}
