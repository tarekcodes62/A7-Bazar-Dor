import React from 'react';
interface Categore {
  id: string;
  icon: string;
  nameBn: string;
  slug: string;
}
interface NavLinkProps {
  categore: Categore;
}
const NavLink = ({ categore }: NavLinkProps) => {
  return (
    <li className="flex gap-1 py-1 px-3 rounded-md hover:bg-gray-200 duration-150">
      <span>{categore.icon}</span>
      <p>{categore.nameBn}</p>
    </li>
  );
};

export default NavLink;
