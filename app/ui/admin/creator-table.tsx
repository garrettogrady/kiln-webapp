// "use client";
// import React, { useState, useEffect } from 'react';
// import { Dialog } from '@headlessui/react';
// import {fetchCreators, fetchCreatorSignups} from "@/app/lib/data";
// import { CreatorOnboardData } from "@/app/lib/definitions";
//
// export default function CreatorTable() {
//     const [creators, setCreators] = useState<CreatorOnboardData[]>([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
//     const [ccInfo, setCCInfo] = useState({
//         name: '',
//         cardNumber: '',
//         cvv: '',
//         expiration: ''
//     });
//
//     useEffect(() => {
//         getCreators();
//     }, []);
//
//     const getCreators = async () => {
//         try {
//             const response = await fetchCreators();
//             setCreators(response);
//         } catch (error) {
//             console.error('Error fetching creators:', error);
//         }
//     };
//
//     const handleApprove = (id: string) => {
//         setSelectedCreatorId(id);
//         setIsModalOpen(true);
//     };
//
//     const handleCCInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setCCInfo({ ...ccInfo, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`/api/approveCreator/${selectedCreatorId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(ccInfo),
//             });
//             if (response.ok) {
//                 setCreators(creators.filter(creator => creator.id !== selectedCreatorId));
//                 setIsModalOpen(false);
//                 setCCInfo({ name: '', cardNumber: '', cvv: '', expiration: '' });
//             }
//         } catch (error) {
//             console.error('Error approving creator:', error);
//         }
//     };
//
//     return (
//         <div className="container mx-auto py-10 px-4">
//             <h1 className="text-2xl font-bold mb-5">Creator Onboard Data</h1>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full leading-normal">
//                     <thead>
//                     <tr>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             Name
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             Email
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             Phone
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             Instagram
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             TikTok
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             City
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                             Action
//                         </th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {creators.map((creator) => (
//                         <tr key={creator.id}>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <p className="text-gray-900 whitespace-no-wrap">{creator.name}</p>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <p className="text-gray-900 whitespace-no-wrap">{creator.email}</p>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <p className="text-gray-900 whitespace-no-wrap">{creator.phone}</p>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <a href={`https://www.instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 whitespace-no-wrap underline">
//                                     {creator.instagram}
//                                 </a>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <a href={`https://www.tiktok.com/${creator.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 whitespace-no-wrap underline">
//                                     {creator.tiktok}
//                                 </a>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <p className="text-gray-900 whitespace-no-wrap">{creator.city}</p>
//                             </td>
//                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                 <button
//                                     onClick={() => handleApprove(creator.id)}
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Approve
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//
//             <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
//                 <div className="flex items-center justify-center min-h-screen">
//                     <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//
//                     <div className="relative bg-white rounded max-w-md mx-auto p-6">
//                         <Dialog.Title className="text-lg font-medium text-gray-900">Enter Credit Card Information</Dialog.Title>
//                         <form onSubmit={handleSubmit} className="mt-4">
//                             <div className="mb-4">
//                                 <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name on Card</label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={ccInfo.name}
//                                     onChange={handleCCInfoChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
//                                 <input
//                                     type="text"
//                                     id="cardNumber"
//                                     name="cardNumber"
//                                     value={ccInfo.cardNumber}
//                                     onChange={handleCCInfoChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     required
//                                     pattern="\d{16}"
//                                     title="Please enter a valid 16-digit card number"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
//                                 <input
//                                     type="text"
//                                     id="cvv"
//                                     name="cvv"
//                                     value={ccInfo.cvv}
//                                     onChange={handleCCInfoChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     required
//                                     pattern="\d{3,4}"
//                                     title="Please enter a valid 3 or 4-digit CVV"
//                                 />
//                             </div>
//                             <div className="mb-6">
//                                 <label htmlFor="expiration" className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
//                                 <input
//                                     type="text"
//                                     id="expiration"
//                                     name="expiration"
//                                     value={ccInfo.expiration}
//                                     onChange={handleCCInfoChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                     required
//                                     pattern="(0[1-9]|1[0-2])\/\d{2}"
//                                     placeholder="MM/YY"
//                                     title="Please enter a valid expiration date in MM/YY format"
//                                 />
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Submit
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// }