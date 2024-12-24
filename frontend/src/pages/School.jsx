import React, {useEffect, useRef, useState} from 'react';
import {getAllClothing} from "../services/clothingService.jsx";
import {fetchNews} from "../services/newsService.jsx";
import {motion, useInView} from "framer-motion";
const DIR_URL = import.meta.env.VITE_DIRECTORY_URL;

const School = () => {
    const [boysClothing, setSchoolClothing] = useState([]);
    const ref3 = useRef(null)
    const inView3 = useInView(ref3)

    useEffect(() => {
        // Fetching the clothing data on page load
        const fetchClothingItems = async () => {
            try {
                const boys = await getAllClothing({subCategoryId: "67644f0c3e7fad60d668430a"});
                setSchoolClothing(boys);
            } catch (error) {
                console.error('Error fetching clothing items:', error);
            }
        };

        fetchClothingItems();
    }, []);

    const itemVariants3 = {
        hidden: {opacity: 0, scale: 0.8}, // Элемент изначально маленький и прозрачный
        visible: (index) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: index * 0.2, // Задержка для каждого элемента
                duration: 0.8,
                ease: 'easeOut',
            },
        }),
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };


    return (
        <div>
            <div className="relative h-[400px] bg-cover bg-center"
                 style={{backgroundImage: "url('/portrait-young-boy-student-school-uniform.jpg')"}}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <motion.div
                    className="absolute inset-0 flex justify-center items-center text-center"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">
                        Для Школы
                    </h1>
                </motion.div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-5  mx-auto gap-4 px-4" ref={ref3}>
                {boysClothing.map((item, index) => (
                    <motion.div key={item.id}
                                className="p-4 mx-auto rounded-lg max-w-[337px] relative"
                                initial="hidden"
                                animate={inView3 ? 'visible' : 'hidden'} // Анимация включается только при появлении
                                variants={itemVariants3}
                                custom={index}>
                        <img src={`${DIR_URL}${item.imageUrl}`} alt={item.name}
                             className="object-cover h-[337px] w-[337px] rounded-md"/>
                        <span
                            className="p-1 px-2 rounded bg-white text-[#43D0FF] font-semibold absolute top-6 right-6 text-[12px]">Новинка</span>
                        <h2 className="text-lg font-semibold text-[#39407B]">{item.name}</h2>
                        <p className="text-sm text-gray-500">
                            {item.categoryId.name}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 mt-2">
                                {JSON.parse(item.sizes[0]).map((size) => (
                                    <span key={size}
                                          className="uppercase   items-center rounded-md  m-1 text-center p-2 py-1 text-[12px] font-bold text-[#727272] ring-1 ring-inset ring-gray-500/10">
                                         {size}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-1 mt-4">
                                {JSON.parse(item.colors[0]).map((color) => (
                                    <div
                                        key={color}
                                        className="w-[14px] h-[14px] rounded-full"
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default School;
