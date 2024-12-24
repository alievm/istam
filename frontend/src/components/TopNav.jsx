import React from 'react';
import {LuMoveRight} from "react-icons/lu";

const TopNav = () => {
    return (
        <div
            className="flex flex-wrap gap-1 justify-center items-center px-24 py-2.5 text-sm font-medium tracking-normal leading-none text-white bg-black max-md:px-5">
            <div className="self-stretch my-auto">Новое поступление</div>
            <img
                loading="lazy"
                src="/emoji.png"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
            <div className="flex gap-2 items-center self-stretch my-auto">
                <div className="self-stretch my-auto">Посмотреть каталог</div>
                <LuMoveRight className="text-white" size="20" />
            </div>
        </div>
    );
};

export default TopNav;
