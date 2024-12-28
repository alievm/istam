import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import TopNav from "./components/TopNav.jsx";
import Boys from "./pages/Boys.jsx";
import Girls from "./pages/Girls.jsx";
import New from "./pages/New.jsx";
import Marquee from "react-fast-marquee";
import School from "./pages/School.jsx";
import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt} from "react-icons/fa";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa6";


function App() {

  return (
      <BrowserRouter>
          <Marquee className="marquee__wrap">
              <div className="stroke__content">
                  <p className="stroke__text">Откройте для себя стильную и удобную детскую одежду!</p>
              </div>
              <div className="stroke__content img">
                  <img src="/emoji.png" alt="wind" className="stroke__ico"/>
              </div>
              <div className="stroke__content">
                  <p className="stroke__text">Наши коллекции - это гармония комфорта и модных тенденций для ваших
                      детей.</p>
              </div>
              <div className="stroke__content img">
                  <img src="/emoji.png" alt="wind" className="stroke__ico"/>
              </div>
              <div className="stroke__content">
                  <p className="stroke__text">Только лучшие материалы для ваших малышей, безопасные и приятные на
                      ощупь.</p>
              </div>
              <div className="stroke__content img">
                  <img src="/emoji.png" alt="wind" className="stroke__ico"/>
              </div>
              <div className="stroke__content">
                  <p className="stroke__text">Доступные цены и уникальные предложения на каждую коллекцию!</p>
              </div>
              <div className="stroke__content img">
                  <img src="/emoji.png" alt="wind" className="stroke__ico"/>
              </div>
              <div className="stroke__content">
                  <p className="stroke__text">Свежие новинки каждый сезон - следите за нашими обновлениями!</p>
              </div>
              <div className="stroke__content img">
                  <img src="/emoji.png" alt="wind" className="stroke__ico"/>
              </div>
          </Marquee>

          <Navbar/>
          <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/boys" element={<Boys/>}/>
              <Route path="/girls" element={<Girls/>}/>
              <Route path="/new" element={<New/>}/>
              <Route path="/school" element={<School/>}/>
          </Routes>
          <footer className="bg-gradient-to-r from-blue-400 mt-5 to-[#38bdf8] text-white py-10">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                      {/* Company Info */}
                      <div>
                          <h2 className="text-xl font-bold">Istam Luxury</h2>
                          <p className="mt-4 text-sm leading-relaxed">
                              Откройте роскошь и комфорт с Istam Luxury. Мы создаем незабываемые впечатления для наших
                              клиентов.
                          </p>
                          <div className="flex pt-5 space-x-4">
                          {/* Facebook Icon */}
                          <a href="#" className="text-blue-500 hover:text-blue-400 transition duration-300">
                              <FaFacebook size={24} />
                          </a>

                          {/* Instagram Icon */}
                          <a href="#" className="text-pink-500 hover:text-pink-400 transition duration-300">
                              <FaInstagram size={24} />
                          </a>

                          {/* Twitter Icon */}
                          <a href="#" className="text-white hover:text-gray-200 transition duration-300">
                              <FaTwitter size={24} />
                          </a>
                      </div>
              </div>

                      {/* Contact Info */}
                      <div>
                          <h2 className="text-xl font-bold">Контакты</h2>
                          <ul className="mt-4 space-y-3 text-sm">
                              <li>
                                  <span className="font-medium">Телефон:</span> +998 90 123 45 67
                              </li>
                              <li>
                                  <span className="font-medium">Email:</span> burdaluxtextile.gmail.com
                              </li>
                              <li>
                                  <span className="font-medium">Адрес:</span> Бухара, ул. Халклар дустлиги, 100
                              </li>
                          </ul>
                      </div>

                      {/* Quick Links */}
                      <div>
                          <h2 className="text-xl font-bold">Полезные ссылки</h2>
                          <ul className="mt-4 space-y-3 text-sm">
                              <li>
                                  <a href="#" className="hover:underline hover:text-gray-200">О нас</a>
                              </li>
                              <li>
                                  <a href="#" className="hover:underline hover:text-gray-200">Услуги</a>
                              </li>
                              <li>
                                  <a href="#" className="hover:underline hover:text-gray-200">Контакты</a>
                              </li>
                              <li>
                                  <a href="#" className="hover:underline hover:text-gray-200">FAQ</a>
                              </li>
                          </ul>
                      </div>

                      {/* Newsletter */}
                      <div>
                          <h2 className="text-xl font-bold">Подписка на новости</h2>
                          <p className="mt-4 text-sm leading-relaxed">
                              Подпишитесь на нашу рассылку и будьте в курсе всех новостей и предложений!
                          </p>
                          <form className="mt-6">
                              <div className="flex items-center">
                                  <input
                                      type="email"
                                      placeholder="Ваш email"
                                      className="w-full p-2 text-sm text-black rounded-l-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                  />
                                  <button
                                      type="submit"
                                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none"
                                  >
                                      Подписаться
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>

                  {/* Footer Bottom */}
                  <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm">
                      <p>© 2024 Istam Luxury. Все права защищены.</p>
                  </div>
              </div>
          </footer>

      </BrowserRouter>
  )
}

export default App
