import React, { useState, useEffect } from 'react';
import {fetchCampaigns, fetchCreators, fetchCreatorSignups} from "@/app/lib/data";
import {PersonStandingIcon} from "lucide-react";
import Link from "next/link";

export default async function CreatorAdminTable() {
    const creators = await fetchCreatorSignups();
    console.log(creators);
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {creators?.map((creator) => (
                            <div
                                key={creator.name}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                           <PersonStandingIcon/>
                                            <p>{creator.name}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {creator.email}
                                        </p>
                                        <p>{creator.phone}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Phone
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Instagram
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                TikTok
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                City
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {creators?.map((creator) => (
                            <tr
                                key={creator.name}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <div className="flex items-center gap-3">
                                        <PersonStandingIcon/>
                                        <p>{creator.name}</p>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {creator.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {creator.phone}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    <a
                                        href={`https://www.instagram.com/${creator.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 whitespace-no-wrap underline"
                                    >
                                        {creator.instagram}
                                    </a>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    <a
                                        href={`https://www.tiktok.com/${creator.tiktok}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-900 whitespace-no-wrap underline"
                                    >
                                        {creator.tiktok}
                                    </a>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {creator.city}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <Link href={`/admin/creator/approve/${creator.id}`}>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Approve
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}