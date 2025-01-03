import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import { FaLocationDot, FaMapLocationDot, FaPhone } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Squash as Hamburger } from 'hamburger-react'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="w-full flex items-center sticky bg-white z-30 top-0 justify-around h-[77px] px-4 md:px-8">
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
                <Button size="large" onClick={toggleMenu} icon={<Hamburger size="20"/>} className="rounded-full">
                </Button>
            </div>

            {/* Logo */}


            {/* Desktop Navigation */}
            <ul className="hidden md:flex h-full justify-center relative">
                {[
                    {name: 'Главная страница', href: '/'},
                    {name: 'Мальчикам', href: '/boys'},
                    {name: 'Школа', href: '/school'},
                    {name: 'Каталог', href: '/new'},
                ].map((item, index) => (
                    <li
                        key={index}
                        className="relative px-4 cursor-pointer group"
                    >
                        <a
                            href={item.href}
                            className="flex items-center text-base h-full"
                        >
                            {item.name}
                        </a>
                        <div
                            className="absolute bottom-0 left-0 w-full h-[4px] bg-[#6fcdfa] scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-center"
                        ></div>
                    </li>
                ))}
            </ul>

            <img className="h-[45px]" src="/logotip.png" alt="Logo"/>
            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    className="absolute top-[77px] left-0 right-0 bg-white shadow-lg md:hidden"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    <ul className="flex flex-col items-center py-4">
                        {['Главная страница', 'Мальчикам', 'Школа', 'Каталог'].map((item, index) => (
                            <li
                                key={index}
                                className="py-2 text-base cursor-pointer"
                                onClick={() => setIsOpen(false)} // Close menu after selecting an item
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-5 items-center text-neutral-500">
                {/* Search Bar */}
                <div
                    className="hidden md:flex gap-2 items-center px-5 py-3 rounded-full border border-solid border-zinc-100">
                    <input
                        type="text"
                        placeholder="Найти одежду"
                        className="flex-grow text-neutral-600 bg-transparent outline-none"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/0e60d26ffe404316aa35b6241738714a/b6b45fc57f3eb760330ae4b3482a0a106860b879e3034428b4a223d93df53e46?apiKey=0e60d26ffe404316aa35b6241738714a&"
                        alt="Search"
                        className="object-contain shrink-0 w-4 aspect-square"
                    />
                </div>

                {/* Location and Phone Icons */}
                <Button className="rounded-full" size="large" icon={<FaMapLocationDot size="23"/>}/>
                <Button className="rounded-full lg:block hidden" size="large" icon={<FaPhone size="23"/>}/>
            </div>
        </div>
    );
};

export default Navbar;
