"use client";
import React, { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: "🏠", route: "/" },
  { label: "Report", icon: "📄", route: "/report" },
];

export default function SideNav({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-indigo-800 text-white shadow-lg z-20 flex flex-col transition-all duration-200 ${
        open ? "w-44 items-start" : "w-14 items-center"
      } pt-6`}
    >
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
        className={`bg-transparent border-none text-white text-2xl mb-8 cursor-pointer ${
          open ? "self-end mr-4" : "self-center"
        }`}
      >
        {open ? "✖️" : "☰"}
      </button>
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.route}
          className={`flex items-center gap-3 bg-transparent border-none text-lg px-3 py-2 w-full cursor-pointer mb-2 rounded-lg transition-colors duration-200 ${
            active === item.label
              ? "bg-indigo-900 text-yellow-400 font-bold"
              : "text-white font-normal"
          } ${open ? "" : "justify-center"}`}
        >
          <span className="text-2xl">{item.icon}</span>
          {open && <span>{item.label}</span>}
        </a>
      ))}
    </aside>
  );
}
