// import FilterItemDropdown from './dropdown';
// import { FilterItem } from './item';
// import {SortFilterItem} from "@/app/lib/definitions";
// import {usePathname, useSearchParams} from "next/navigation";
// import {createUrl} from "@/app/lib/utils";
// export type ListItem = SortFilterItem
//
// function FilterItemList({ list }: { list: ListItem[] }) {
//   return (
//     <>
//       {list.map((item: ListItem, i) => (
//           <SortFilterItem item={item} />
//       ))}
//     </>
//   );
// }
//
// function SortFilterItem({ item }: { item: SortFilterItem }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const active = searchParams.get('sort') === item.slug;
//   const q = searchParams.get('q');
//   const href = createUrl(
//       pathname,
//       new URLSearchParams({
//         ...(q && { q }),
//         ...(item.slug && item.slug.length && { sort: item.slug })
//       })
//   );
//   const DynamicTag = active ? 'p' : Link;
//
//   return (
//       <li className="mt-2 flex text-sm text-black dark:text-white" key={item.title}>
//         <DynamicTag
//             prefetch={!active ? false : undefined}
//             href={href}
//             className={clsx('w-full hover:underline hover:underline-offset-4', {
//               'underline underline-offset-4': active
//             })}
//         >
//           {item.title}
//         </DynamicTag>
//       </li>
//   );
// }
// export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
//   return (
//     <>
//       <nav>
//         {title ? (
//           <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
//             {title}
//           </h3>
//         ) : null}
//         <ul className="hidden md:block">
//           <FilterItemList list={list} />
//         </ul>
//         <ul className="md:hidden">
//           <FilterItemDropdown list={list} />
//         </ul>
//       </nav>
//     </>
//   );
// }
