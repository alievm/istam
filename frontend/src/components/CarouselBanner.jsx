import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {Button} from "antd";

const CarouselBanner = () => {
    const slides = [
        "Cтильная одежда для мальчиков на любой вкус!",
        "Присоединяйтесь к нам сегодня и сделайте разницу завтра.",
        "Откройте для себя новые возможности с нашей платформой.",
    ];


    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="bg-white border-b border-gray-100 text-black py-2">
            {/* Centralized Text Above Carousel */}

            {/* Carousel */}
            <div className="relative flex max-w-2xl mx-auto items-center justify-center">
                <Button
                    onClick={handlePrev}
                    className="absolute left-4 "
                    icon={<FaArrowLeft size={20} />}
                    type="primary"
                />

                <div className="w-full max-w-2xl text-center overflow-hidden">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-base text-[#43D0FF] hover:underline"
                    >
                        {slides[currentSlide]}
                    </motion.div>
                </div>

                <Button
                    type="primary"
                    onClick={handleNext}
                    className="absolute right-4 "
                    icon={ <FaArrowRight size={17} />}
                />
            </div>
        </div>
    );
};

export default CarouselBanner;
