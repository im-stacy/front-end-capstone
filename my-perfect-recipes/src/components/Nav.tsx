import React, { useState } from "react";

type Link = {
  label: string;
  href: string;
};

const links = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Recipes",
    href: "/recipes",
  },
];

// const Links: React.FC<{ links: Link[] }> = ({ links }) => {
//     return (
//         <div className={styles['links-container']}>
//             {links.map((link: Link) => {
//                 return (
//                     <div key={link.href} className={styles['link']}>
//                         <a href={link.href}>
//                             {link.label}
//                         </a>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// };

const Nav: React.FC<{ onSearch: (text: string) => void }> = ({ onSearch }) => {
  const [text, setText] = useState("");
  return (
    <nav className="py-3 w-screen bg-red-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-white rounded-full"></div>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <div className="relative text-gray-600">
            <input
              className="w-full h-10 pl-3 pr-8 rounded-full text-sm bg-white focus:outline-none"
              type="text"
              placeholder="Search Recipes"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M18.66 17.34l-5.65-5.65a7.5 7.5 0 1 0-1.41 1.41l5.65 5.65a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41zM7.5 13A5.5 5.5 0 1 1 13 7.5 5.5 5.5 0 0 1 7.5 13z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <Links links={links} /> */}
    </nav>
  );
};

export default Nav;
