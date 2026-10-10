'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface Categore {
  id: string;
  icon: string;
  nameBn: string;
  slug: string;
}
interface NavLinkProps {
  categories: Categore[];
}
const NavLink = ({ categories }: NavLinkProps) => {
  const pathname = usePathname();
  return (
    <ul className="flex gap-2">
      {categories?.map(categore => {
        const href = `/category/${encodeURIComponent(categore.slug)}`;
        return (
          <li key={categore.id}>
            <Link
              href={href}
              className={`flex gap-1 py-1 px-3 rounded-md text-[12px] md:text-[14px] ${
                pathname === href
                  ? 'bg-green-700 text-white'
                  : 'hover:bg-gray-200 duration-150'
              } `}
            >
              <span>{categore.icon}</span>
              <p>{categore.nameBn}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLink;
