import React, {useEffect, useRef, useState} from 'react';
import HeaderCarousel from "../components/HeaderCarousel.jsx";
import {getAllClothing} from "../services/clothingService.jsx";
import {Button, Image} from "antd";
import {motion, useInView} from "framer-motion";
import {fetchNews} from "../services/newsService.jsx";
import {IoMdTime} from "react-icons/io";
import {HiXMark} from "react-icons/hi2";

const DIR_URL = import.meta.env.VITE_DIRECTORY_URL;

const Homepage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [boysClothing, setBoysClothing] = useState([]);
    const [girlsClothing, setGirlsClothing] = useState([]);
    const [news, setNews] = useState([]);

    const ref = useRef(null)
    const inView = useInView(ref)

    const ref0 = useRef(null)
    const inView0 = useInView(ref0)

    const ref1 = useRef(null)
    const inView1 = useInView(ref1)

    const ref2 = useRef(null)
    const inView2 = useInView(ref2)

    const ref3 = useRef(null)
    const inView3 = useInView(ref3)

    const ref4 = useRef(null)
    const inView4 = useInView(ref4)

    const ref5 = useRef(null)
    const inView5 = useInView(ref5)

    const ref6 = useRef(null)
    const inView6 = useInView(ref6)


    const cardVariants = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
    };

    const textVariants = {
        hidden: {opacity: 0, x: -50}, // Сдвиг текста влево
        visible: {opacity: 1, x: 0, transition: {duration: 0.8, ease: 'easeOut'}},
    };

    const headingVariants = {
        hidden: {opacity: 0, x: 50}, // Сдвиг заголовка вправо
        visible: {opacity: 1, x: 0, transition: {duration: 1, ease: 'easeOut'}},
    };


    const itemVariants = {
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

    const itemVariants2 = {
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


    const containerVariants = {
        hidden: {opacity: 0, y: 50}, // Начальное состояние: элемент смещен вниз и прозрачный
        visible: {
            opacity: 1,
            y: 0, // Возвращаемся в исходное положение
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                staggerChildren: 0.3, // Задержка между анимациями дочерних элементов
            },
        },
    };

    const childVariants = {
        hidden: {opacity: 0, scale: 0.9},
        visible: {opacity: 1, scale: 1, transition: {duration: 0.6}},
    };

    useEffect(() => {
        // Fetching the clothing data on page load
        const fetchClothingItems = async () => {
            try {
                const data = await getAllClothing({});
                setClothingItems(data);

                const boys = await getAllClothing({subCategoryId: "6756da3a0c9461c050a9cf21"});
                setBoysClothing(boys);

                const girls = await getAllClothing({subCategoryId: "67644f083e7fad60d6684307"});
                setGirlsClothing(girls);

                const newsData = await fetchNews();
                setNews(newsData);
            } catch (error) {
                console.error('Error fetching clothing items:', error);
            }
        };

        fetchClothingItems();
    }, []);

    const items = [
        {
            img: 'https://cdn.builder.io/api/v1/image/assets/TEMP/66831e5cd73429a5841d852d7f7a421151b70859f63a7aebe91a532e6c0fec61?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a',
            title: 'Бесплатная доставка + возврат',
            description:
                'Доставим ваш заказ бесплатно и примем возврат без лишних вопросов — удобно, быстро, просто.',
        },
        {
            img: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68c36d055232158b064b98d592c1083b69ee74e27142442bbe6c09ed2e76f0d1?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a',
            title: 'Поддержка онлайн 24/7',
            description:
                'Наша команда всегда на связи, чтобы помочь вам в любое время дня и ночи.',
        },
        {
            img: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b05285349b073185df3c0ac76342683385e930a9b05662b0391c250b8e7c201?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a',
            title: 'Безопасные платежи',
            description:
                'Ваши данные под надежной защитой благодаря современным технологиям безопасности',
        },
    ];

    return (
        <div>
            <div
                className="relative isolate flex items-center gap-x-6 overflow-hidden bg-white px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
            >
                <div
                    aria-hidden="true"
                    className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#43D0FF] to-[#43D0FF] opacity-50"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#43D0FF] to-[#43D0FF] opacity-50"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm/6  flex items-center gap-3 text-gray-900">
                        <strong className="font-semibold">Добро пожаловать!</strong>
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" fill="none" viewBox="0 0 29 24">
                            <path fill="#43D0FF"
                                  d="M11.9 5.7h-.2c-.2 1.7-.8 5-2.4 6.7-1.6 1.6-4.9 2.2-6.6 2.3v.2c1.7.2 5 .8 6.6 2.4s2.2 5 2.4 6.7h.2c.1-1.8.7-5 2.3-6.7 1.6-1.6 5-2.2 6.6-2.4v-.2c-1.7-.1-5-.7-6.6-2.3s-2.2-5-2.3-6.7M3.3 0c-.1.6-.3 1.8-.9 2.4s-1.8.8-2.4.9c.6.1 1.8.3 2.4 1 .6.5.8 1.7.9 2.3.1-.6.3-1.8.9-2.4s1.8-.8 2.4-.8v-.1c-.6 0-1.8-.3-2.4-.9S3.4.6 3.3 0m20.2 1h-.2c0 1.1-.4 3.2-1.4 4.2s-3 1.3-4 1.4c-.1 0-.1.1 0 .1 1 .1 3 .5 4 1.5s1.3 3 1.4 4c0 .1.2.1.2 0 0-1 .4-3 1.4-4s3-1.4 4-1.5q.15 0 0 0c-1-.2-3-.5-4-1.5s-1.3-3-1.4-4.1Z"></path>
                        </svg>
                       <span className="lg:block hidden">Откройте для себя бесконечные возможности!</span>
                    </p>
                    <Button type="primary">Каталог</Button>
                </div>
                <div className="flex flex-1 justify-end">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                        <span className="sr-only">Dismiss</span>
                        <HiXMark aria-hidden="true" className="size-5 text-gray-900"/>
                    </button>
                </div>
            </div>

            <HeaderCarousel/>

            <motion.div
                ref={ref0}
                variants={cardVariants}
                initial="hidden"
                animate={inView0 ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 container mx-auto my-5 gap-8 items-start px-4"
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center px-8 pt-5 pb-8 rounded-2xl border-2 border-dashed border-zinc-300 sm:px-6 lg:px-4 w-full"
                        variants={cardVariants}
                        initial="hidden"
                        animate={inView0 ? "visible" : "hidden"}
                    >
                        <img
                            loading="lazy"
                            src={item.img}
                            className="object-contain aspect-square w-[60px] mb-4"
                            alt={item.title}
                        />
                        <div className="flex flex-col items-center max-w-full w-full">
                            <div
                                className="text-lg sm:text-xl font-semibold tracking-normal leading-snug text-zinc-700 text-center">
                                {item.title}
                            </div>
                            <div
                                className="mt-4 text-sm sm:text-base tracking-normal leading-6 text-center text-neutral-500">
                                {item.description}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>


            <div ref={ref4} className="text-center overflow-hidden mb-5">
                <motion.h1
                    className=" font-bold text-4xl text-[#39407B]"
                    variants={headingVariants}
                    initial="hidden"
                    animate={inView4 ? 'visible' : 'hidden'}
                >
                    Новые поступления
                </motion.h1>
                <motion.h1
                    className="text-xl text-[#727272]"
                    variants={textVariants}
                    initial="hidden"
                    animate={inView4 ? 'visible' : 'hidden'}
                >
                    Наша коллекция новинок, товары из последних коллекций и товары, доступные во всем магазине.
                </motion.h1>
            </div>


            {/*Show here only 4 items*/}
            <div
                className="flex flex-wrap justify-center container mx-auto gap-8 px-4"
                ref={ref5}
            >
                {clothingItems.slice(0, 4).map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="p-4 rounded-lg max-w-[337px] w-full sm:w-[48%] md:w-[337px] relative flex flex-col"
                        initial="hidden"
                        animate={inView5 ? "visible" : "hidden"} // Animation triggers only when in view
                        variants={itemVariants}
                        custom={index} // Index for animation delay
                    >
                        <Image
                            height="337px"
                            width="337px"
                            src={`${DIR_URL}${item.imageUrl}`}
                            alt={item.name}
                            className="object-cover h-[337px] will-change-auto w-full sm:w-[337px] rounded-md"
                        />
                        <span
                            className="p-1 px-2 rounded bg-white text-[#43D0FF] font-semibold absolute top-6 right-0 text-[12px]"
                        >
                Новинка
            </span>
                        <h2 className="text-lg font-semibold text-[#39407B] mt-2 lg:text-start text-center">
                            {item.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {item.categoryId.name}
                        </p>
                        <div className="flex justify-between items-center w-full mt-2">
                            <div className="flex gap-1">
                                {JSON.parse(item.sizes[0]).map((size) => (
                                    <span
                                        key={size}
                                        className="uppercase items-center rounded-md m-1 text-center p-2 py-1 text-[12px] font-bold text-[#727272] ring-1 ring-inset ring-gray-500/10"
                                    >
                            {size}
                        </span>
                                ))}
                            </div>
                            <div className="flex gap-1">
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


            <motion.div
                className="flex max-w-7xl gap-4 lg:flex-nowrap flex-wrap my-10 mx-auto"
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <motion.div
                    className="bg-[#43d0ff] relative rounded-r-3xl p-3 flex items-center h-[604px] w-[476px]"
                    variants={childVariants}
                >
                    <h1 className="text-white text-[40px] font-bold uppercase">
                        Соберите школьный стиль вместе с нами
                    </h1>
                    <img className="absolute bottom-0 left-0" src="/cloud-btm.png"/>
                    <img className="absolute top-0 right-0" src="/header-cloud.png"/>
                </motion.div>

                <motion.div
                    className="rounded-r-3xl overflow-hidden relative p-3 flex items-center h-[604px] w-[476px]"
                    style={{
                        backgroundImage: "url('/bgsvg.svg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                    variants={childVariants}
                >
                    <motion.img
                        className="absolute"
                        src="/school-boy-isolated_23-2151852975-removebg-preview.png"
                        animate={{
                            rotate: [-5, 5, -5], // Swing left and right
                        }}
                        transition={{
                            duration: 2, // Duration of one complete swing
                            repeat: Infinity, // Keep swinging indefinitely
                            ease: "easeInOut", // Smooth swinging motion
                        }}
                    />
                    <div
                        className="flex absolute bottom-0 right-0 gap-0.5 items-start px-8 py-3 text-sm font-semibold tracking-normal text-white uppercase whitespace-nowrap bg-sky-400 rounded-br-xl">
                        <div>перейти</div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e530f569e48beff015597b749360e74ec1a3fee4f93391c5e08bab1a227268?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a"
                            className="object-contain shrink-0 w-6 aspect-square"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="rounded-r-3xl relative overflow-hidden p-3 flex items-center h-[604px] w-[476px]"
                    style={{
                        backgroundImage: "url('/bgsvg2.svg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                    variants={childVariants}
                >
                    <img className="absolute mx-auto h-[80%] right-0 left-0" src="/360527584_11452550.png"/>
                    <div
                        className="flex absolute bottom-0 right-0 gap-0.5 items-start px-8 py-3 text-sm font-semibold tracking-normal text-white uppercase whitespace-nowrap bg-sky-400 rounded-br-2xl">
                        <div>перейти</div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e530f569e48beff015597b749360e74ec1a3fee4f93391c5e08bab1a227268?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a"
                            className="object-contain shrink-0 w-6 aspect-square"
                        />
                    </div>
                </motion.div>
            </motion.div>

            <div className="text-center overflow-hidden my-5" ref={ref1}>
                {/* Animated heading */}
                <motion.h1
                    className="font-bold text-3xl sm:text-4xl text-[#39407B]"
                    variants={headingVariants}
                    initial="hidden"
                    animate={inView1 ? 'visible' : 'hidden'}
                >
                    Наша коллекция
                </motion.h1>

                {/* Animated text */}
                <motion.h1
                    className="text-base sm:text-xl text-[#727272] mx-auto max-w-4xl"
                    variants={textVariants}
                    initial="hidden"
                    animate={inView1 ? 'visible' : 'hidden'}
                >
                    Откройте для себя уникальные модели, созданные для ярких моментов детства. Удобство, качество и
                    современные дизайны — все, что нужно для маленьких модников!
                </motion.h1>
            </div>


            {/*<div className="flex flex-col sm:flex-row justify-between container mx-auto mb-5 mt-10 px-4">*/}
            {/*    <h1 className="capitalize font-bold text-2xl sm:text-3xl text-[#39407B] text-center sm:text-left">*/}
            {/*        Трендовый выбор для Девочек*/}
            {/*    </h1>*/}
            {/*    <a href="/girls"*/}
            {/*        className="flex items-center gap-0.5 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-normal text-white uppercase whitespace-nowrap bg-sky-400 rounded-xl mt-4 sm:mt-0"*/}
            {/*    >*/}
            {/*        <div>пЕРЕЙТИ</div>*/}
            {/*        <img*/}
            {/*            loading="lazy"*/}
            {/*            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e530f569e48beff015597b749360e74ec1a3fee4f93391c5e08bab1a227268?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a"*/}
            {/*            className="object-contain shrink-0 w-6 aspect-square"*/}
            {/*        />*/}
            {/*    </a>*/}
            {/*</div>*/}

            {/*<div className="flex flex-wrap justify-center container mx-auto gap-8 px-4" ref={ref2}>*/}
            {/*    <div className="w-[337px] h-[506px] rounded-xl bg-girls">*/}
            {/*    </div>*/}
            {/*    {girlsClothing.slice(0, 3).map((item, index) => (*/}
            {/*        <motion.div key={item.id}*/}
            {/*                    className="p-4 rounded-lg max-w-[337px] relative"*/}
            {/*                    initial="hidden"*/}
            {/*                    animate={inView2 ? 'visible' : 'hidden'} // Анимация включается только при появлении*/}
            {/*                    variants={itemVariants2}*/}
            {/*                    custom={index}>*/}
            {/*            <Image*/}
            {/*                height="337px"*/}
            {/*                width="337px"*/}
            {/*                src={`${DIR_URL}${item.imageUrl}`}*/}
            {/*                alt={item.name}*/}
            {/*                className="object-cover h-[337px] will-change-auto w-full sm:w-[337px] rounded-md"*/}
            {/*            />*/}
            {/*            <span*/}
            {/*                className="p-1 px-2 rounded bg-white text-[#43D0FF] font-semibold absolute top-6 right-0 text-[12px]">Новинка</span>*/}
            {/*            <h2 className="text-lg font-semibold text-[#39407B]">{item.name}</h2>*/}
            {/*            <p className="text-sm text-gray-500">*/}
            {/*                {item.categoryId.name}*/}
            {/*            </p>*/}
            {/*            <div className="flex justify-between items-center">*/}
            {/*                <div className="flex gap-1 mt-2">*/}
            {/*                    {JSON.parse(item.sizes[0]).map((size) => (*/}
            {/*                        <span key={size}*/}
            {/*                              className="uppercase   items-center rounded-md  m-1 text-center p-2 py-1 text-[12px] font-bold text-[#727272] ring-1 ring-inset ring-gray-500/10">*/}
            {/*                             {size}*/}
            {/*                        </span>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*                <div className="flex gap-1 mt-4">*/}
            {/*                    {JSON.parse(item.colors[0]).map((color) => (*/}
            {/*                        <div*/}
            {/*                            key={color}*/}
            {/*                            className="w-[14px] h-[14px] rounded-full"*/}
            {/*                            style={{*/}
            {/*                                backgroundColor: color,*/}
            {/*                            }}*/}
            {/*                        ></div>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </motion.div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className="flex flex-col sm:flex-row justify-between container mx-auto mb-5 mt-10 px-4">
                <h1 className=" font-bold text-2xl sm:text-3xl text-[#39407B] text-center sm:text-left">
                    Трендовый выбор для мальчиков
                </h1>
                <a href="/boys"
                   className="flex items-center gap-0.5 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-normal text-white uppercase whitespace-nowrap bg-sky-400 rounded-xl mt-4 sm:mt-0"
                >
                    <div>пЕРЕЙТИ</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2e530f569e48beff015597b749360e74ec1a3fee4f93391c5e08bab1a227268?placeholderIfAbsent=true&apiKey=0e60d26ffe404316aa35b6241738714a"
                        className="object-contain shrink-0 w-6 aspect-square"
                    />
                </a>
            </div>


            <div className="flex flex-wrap justify-center container mx-auto gap-8 px-4" ref={ref3}>
                <div className="w-[337px] h-[506px] rounded-xl bg-boys">
                </div>
                {boysClothing.slice(0, 3).map((item, index) => (
                    <motion.div key={item.id}
                                className="p-4 rounded-lg max-w-[337px] relative"
                                initial="hidden"
                                animate={inView3 ? 'visible' : 'hidden'} // Анимация включается только при появлении
                                variants={itemVariants3}
                                custom={index}>
                        <Image
                            height="337px"
                            width="337px"
                            src={`${DIR_URL}${item.imageUrl}`}
                            alt={item.name}
                            className="object-cover h-[337px] will-change-auto w-full sm:w-[337px] rounded-md"
                        />
                        <span
                            className="p-1 px-2 rounded bg-white text-[#43D0FF] font-semibold absolute top-6 right-0 text-[12px]">Новинка</span>
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

            <div ref={ref6} className="text-center overflow-hidden my-5">
                <motion.h1
                    className="font-bold text-3xl sm:text-4xl text-[#39407B]"
                    variants={headingVariants}
                    initial="hidden"
                    animate={inView6 ? 'visible' : 'hidden'}
                >
                    Наши торговые точки
                </motion.h1>
                <motion.h1
                    className="text-base sm:text-xl max-w-4xl mx-auto text-[#727272]"
                    variants={textVariants}
                    initial="hidden"
                    animate={inView6 ? 'visible' : 'hidden'}
                >
                    Откройте для себя уникальные модели, созданные
                    для ярких моментов детства. Удобство, качество и современные дизайны — все, что нужно для маленьких
                    модников!
                </motion.h1>
            </div>

            <section className="text-gray-700 h-[50vh] body-font relative">
                <div className="absolute inset-0 bg-gray-300">
                    <iframe width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0" title="map"
                            scrolling="no"
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A6e256a00d6549cc999ea39f9c0feaea8faf2e89c566e04bc47558dafc9efd307&amp;source=constructor"
                            ></iframe>
                </div>

            </section>



            <div className="flex justify-between container mx-auto mb-5 mt-10">
                <h1 className=" font-bold text-3xl  text-[#39407B]">Новости и тренды</h1>
            </div>

            {/*News*/}
            <div className="grid container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {news.slice(0, 5).map((item) => (
                    <motion.div
                        key={item._id}
                        className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                        whileHover={{scale: 1.02}} // Небольшое увеличение
                        transition={{type: 'spring', stiffness: 200}}
                    >
                        {/* Изображение */}
                        <img
                            src={`${DIR_URL}${item.imageUrl}`}
                            alt={`News Image ${item.title}`}
                            className="w-full object-cover h-48 lg:h-64"
                        />

                        {/* Контент поверх изображения */}
                        <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4 lg:p-6">
                            <p className="text-[#38bdf8] will-change-transform font-bold text-xs uppercase mb-1">
                                Новости
                            </p>
                            <h3 className="text-white will-change-transform font-semibold text-lg lg:text-xl mb-2 leading-tight">
                                {item.title}
                            </h3>
                            <div className="text-sm will-change-transform flex items-center text-gray-300">
                                <IoMdTime size="16"/>
                                <p className="ml-2 ">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Скрываемый контент на ховере */}
                        <motion.div
                            className="absolute inset-0 bg-[#38bdf8] flex items-center justify-center text-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
                            initial={{opacity: 0}}
                            whileHover={{opacity: 1}}
                            transition={{duration: 0.4, ease: "easeOut"}}
                        >
                            <p className="text-white text-sm will-change-transform">
                                {item.content.length > 50 ? `${item.content.slice(0, 50)}...` : item.content}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>


        </div>
    );
};

export default Homepage;
