import React, { useState } from "react";
import { Button } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import {Link} from "react-router-dom";

const HeaderCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Istam",
            subtitle: "luxury",
            text: "Мы создаем стильные, удобные и качественные вещи, которые подойдут для любого случая — от веселых прогулок до торжественных мероприятий",
            image: "/1.png",
        },
        {
            id: 2,
            title: "Istam",
            subtitle: "luxury",
            text: "Пример текста для второго слайда — яркость и стиль для каждого дня",
            image: "/about-photo2.png",
        },
        {
            id: 3,
            title: "Istam",
            subtitle: "luxury",
            text: "Ваш стиль в лучших традициях комфорта и качества",
            image: "/Untitled-design-32.png",
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const slideVariants = {
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "-100%" },
    };

    return (
        <div className="relative w-full h-[85vh] bg-blue-100 overflow-hidden flex items-center justify-center">
            {/* Background Split */}
            <div className="flex absolute items-center h-screen w-full z-0">
                <div className="h-full w-1/2 bg-[#E3F8FF]"></div>
                <div className="h-full w-1/2 bg-[#43D0FF]"></div>
            </div>

            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="absolute w-full h-full flex flex-col items-center justify-center text-center"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <motion.img
                        src="/logoo.svg"
                        className="w-[75%]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    />
                    {/*<p className="text-gray-600 text-lg max-w-xl self-start text-center lg:text-left ml-0 lg:ml-32 px-10">*/}
                    {/*    {slides[currentIndex].text}*/}
                    {/*</p>*/}
                    <motion.img
                        src={slides[currentIndex].image}
                        alt={slides[currentIndex].title}
                        className="mt-5 absolute h-[80vh] object-cover"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/*<motion.div*/}
                    {/*    className="self-start ml-0 lg:ml-40 mt-4"*/}
                    {/*    initial={{ y: 20, opacity: 0 }}*/}
                    {/*    animate={{ y: 0, opacity: 1 }}*/}
                    {/*    transition={{ delay: 0.5, duration: 0.6 }}*/}
                    {/*>*/}
                    {/*    <Link to="/new">*/}
                    {/*    <Button*/}
                    {/*        className=" px-7 py-5"*/}
                    {/*        type="primary"*/}
                    {/*    >*/}
                    {/*        КАТАЛОГ*/}
                    {/*    </Button>*/}
                    {/*    </Link>*/}
                    {/*</motion.div>*/}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute left-5 bg-white rounded flex items-center justify-center w-[32px] h-[32px] text-2xl text-[#43D0FF] hover:text-[#03BEFC]"
                onClick={prevSlide}
            >
                <FaAngleLeft />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute right-5 bg-white rounded flex items-center justify-center w-[32px] h-[32px] text-2xl text-[#43D0FF] hover:text-[#03BEFC]"
                onClick={nextSlide}
            >
                <FaAngleRight />
            </motion.button>

            {/* Preview Thumbnails */}
            <motion.div
                className="absolute bottom-10 right-10 flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                {slides.map((slide, index) => (
                    <motion.img
                        key={index}
                        src={slide.image}
                        alt={slide.title}
                        className={`w-20 h-20 object-scale-down rounded-lg cursor-pointer border-2 ${
                            currentIndex === index
                                ? "border-white/50 bg-[#43D0FF]"
                                : "border-white/50 bg-white/20"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default HeaderCarousel;
