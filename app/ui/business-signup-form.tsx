'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon, BuildingStorefrontIcon, UserCircleIcon,
} from '@heroicons/react/24/outline';
import {ArrowRightIcon, FaceSmileIcon, MapPinIcon, PhoneIcon} from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import {authenticate, businessRegister} from '@/app/lib/actions';

export default function BusinessRegisterForm() {
  const [errorMessage, dispatch] = useFormState(businessRegister, undefined);

  return (
      <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Register
        </h1>
        <div className="w-full">
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="businessName"
            >
              Company Name?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="businessName"
                  type="name"
                  name="businessName"
                  placeholder="Kiln"
                  required
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="businessType"
            >
              Business Type?
            </label>
            <div className="relative">
              <select
                  id="businessType"
                  name="businessType"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="customer-error"
              >
                <option value="" disabled>
                </option>
                <option value="Bar">
                 Bar
                </option>
                <option value="Restaurant">
                  Restaurant
                </option>
                <option value="Hotel">
                  Hotel
                </option>
                <option value="Spa">
                  Spa
                </option>
              </select>
              <UserCircleIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="businessDescription"
            >
              Company Description?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="businessDescription"
                  type="name"
                  name="businessDescription"
                  placeholder="The restaurant pays homage to the..."
                  required
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="businessInstagram"
            >
              Business Instagram?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="businessInstagram"
                  type="text"
                  name="businessInstagram"
                  placeholder="trykiln"
                  required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="businessTikTok"
            >
              Business TikTok?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="businessTikTok"
                  type="text"
                  name="businessTikTok"
                  placeholder="trykiln"
                  required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="contactName"
            >
              Your Name?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="contactName"
                  type="name"
                  name="contactName"
                  placeholder="John Smith"
                  required
              />
              <FaceSmileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="contactPhoneNumber"
            >
              Your Phone Number?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="contactPhoneNumber"
                  type="phone"
                  name="contactPhoneNumber"
                  placeholder="310-310-3100"
                  required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Your Email ?
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="address1"
            >
              Business Address?
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="address1"
                  type="text"
                  name="address1"
                  placeholder="Address "
                  required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="state"
                  type="text"
                  name="state"
                  placeholder="State"
                  required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="zipcode"
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Your Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="confirmPassword"
            >
              Confirm Your Password
            </label>
            <div className="relative">
              <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SignUpButton />
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
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
  );
}
