import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: "Главная страница", path: "/" },
        { name: "Мальчикам", path: "/boys" },
        { name: "Новинки", path: "/new" },
        { name: "Школа", path: "/school" },
    ];

    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    return (
        <div className="flex w-full px-5 py-3 justify-between items-center bg-white shadow-md">
            <img className="h-[53px]" src="/logo1.png" alt="Logo" />

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-[25px]">
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-[#43D0FF] border-b-2 border-[#43D0FF]"
                                    : "hover:text-[#43D0FF] transition-colors"
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <IoSearchOutline size="25" className="hidden md:block" />

            {/* Hamburger Icon for Mobile */}
            <div
                className="md:hidden cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiX size="30" /> : <HiMenuAlt3 size="30" />}
            </div>

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="absolute overflow-hidden top-24 left-0 w-full bg-white  md:hidden z-10"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <ul className="flex flex-col items-center gap-4 py-5">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-[#43D0FF] border-b-2 border-[#43D0FF]"
                                                : "hover:text-[#43D0FF] transition-colors"
                                        }
                                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
