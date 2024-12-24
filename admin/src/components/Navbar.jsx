import React, {useState} from "react";
import {
    Navbar as Nav,
    Collapse,
    Typography,
    Button,
    IconButton,
    Input,
} from "@material-tailwind/react";
import {Bars3Icon, BellIcon, CircleStackIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const location = useLocation();
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = async (href) => {
        setLoading(href);
        navigate(href);
        setTimeout(() => {
            setLoading(null);
        }, 500);
    };

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const navigation = [
        { name: 'Все товары', href: '/' },
        { name: 'Категории', href: '/categories' },
        { name: 'Подкатегории', href: '/subcategories' },
        { name: 'Новости', href: '/news' },
        // { name: 'Места', href: '/places' },
        // { name: 'Клиенты', href: '/clients' },
    ];
    const userNavigation = [
        // { name: 'Профиль', href: '#' },
        // { name: 'Настройки', href: '#' },
        { name: 'Выход', href: '#' },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="bg-[#0747A6] sticky top-0  ">
            <div className="absolute flex top-0 right-[10%]">
                <img className=" h-16" src='/Vector-2.svg'/>
                <img className=" h-16" src='/Vector-1.svg'/>
                <img className=" h-16" src='/Vector.svg'/>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex text-white font-semibold gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                                <rect width="256" height="256" fill="none"></rect>
                                <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="#fff"
                                      stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                                <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="#fff"
                                      stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                            </svg>
                            Istam Luxury
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {navigation.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.href)}
                                        className={classNames(
                                            location.pathname === item.href
                                                ? 'bg-[#0052CC] text-white'
                                                : 'text-[#fff] hover:bg-[#0052CC] hover:text-white',
                                            'cursor-pointer rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-2'
                                        )}
                                    >
                                        {loading === item.href ? (
                                            <>
                                                <svg aria-hidden="true" role="status"
                                                     className="inline w-4 h-4 me-3 text-white animate-spin"
                                                     viewBox="0 0 100 101" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"/>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"/>
                                                </svg>
                                                {item.name}
                                            </>
                                        ) : (
                                            item.name
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton
                                        className="relative flex max-w-xs items-center rounded-full bg-[#0747A6] text-sm focus:outline-none "
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full"/>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <a
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md bg-[#0747A6] p-2 text-white hover:bg-[#0052CC] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0747A6]"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-[#0052CC] text-white' : 'text-white hover:bg-[#0052CC]',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full"/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                            <div className="text-sm font-medium leading-none text-[#DEEBFF]">{user.email}</div>
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full bg-[#0747A6] p-1 text-white hover:text-[#DEEBFF] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0747A6]"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-[#DEEBFF] hover:bg-[#0052CC] hover:text-white"
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}