'use client';
import {CustomerField} from '@/app/lib/definitions';
import Link from 'next/link';
import React, { useState } from "react";

import {
    CalendarIcon,
    CameraIcon, ChatBubbleBottomCenterIcon,
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon, ReceiptPercentIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {createCampaign} from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { TagsInput } from "react-tag-input-component";


export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCampaign, initialState);
    const [tags, setTags] = useState([]);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Start Date */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
                        Choose a Start Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="startDate-error"
                            />
                            <CalendarIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="starDate-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.startDate &&
                                state.errors.startDate.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
                        Choose an End Date
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="endDate-error"
                            />
                            <CalendarIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="endDate-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.endDate &&
                                state.errors.endDate.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="amount-error"
                            />
                            <CurrencyDollarIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="amount-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Campaign Quantity */}
                <div className="mb-4">
                    <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                        Choose a Quantity Cap
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                step="1"
                                placeholder="Enter a quantity"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="quantity-error"
                            />
                            <ReceiptPercentIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="quantity-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.quantity &&
                                state.errors.quantity.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Campaign Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Promotion Title
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                step="1"
                                placeholder="Enter a title"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="title-error"
                            />
                            <ChatBubbleBottomCenterIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="title-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.title &&
                                state.errors.title.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Campaign Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Promotion Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea
                                id="description"
                                rows="4"
                                name="description"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="description-error"
                            />
                            <ChatBubbleBottomCenterIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                        <div id="description-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.description &&
                                state.errors.description.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* creator platform */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Creator Platform Used
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="tiktok"
                                    name="platform"
                                    type="radio"
                                    value="tiktok"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="platform-error"
                                />
                                <label
                                    htmlFor="tiktok"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    TikTok <CameraIcon className="h-4 w-4"/>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="instagram"
                                    name="platform"
                                    type="radio"
                                    value="instagram"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="platform-error"
                                />
                                <label
                                    htmlFor="instagram"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Instagram <CameraIcon className="h-4 w-4"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="platform-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.platform &&
                            state.errors.platform.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>

                {/* post type */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Post Type
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="story"
                                    name="postType"
                                    type="radio"
                                    value="story"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="postType-error"
                                />
                                <label
                                    htmlFor="story"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Story <CameraIcon className="h-4 w-4"/>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="post"
                                    name="postType"
                                    type="radio"
                                    value="post"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby="postType-error"
                                />
                                <label
                                    htmlFor="post"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                    Post <CameraIcon className="h-4 w-4"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="postType-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.postType &&
                            state.errors.postType.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </fieldset>

                {/* Tags */}
                <div className="mb-4">
                    <label htmlFor="tags" className="mb-2 block text-sm font-medium">
                       Tags
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <TagsInput
                                value={tags}
                                onChange={setTags}
                                // classNames="peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="tags-error"
                            />
                            <input hidden="true"
                                   readOnly="true"
                                   value={tags}
                                   name="tags"
                                   id="tags"
                            />
                        </div>
                        <div id="tags-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.tags &&
                                state.errors.tags.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Invoice</Button>
            </div>
        </form>
    );
}
