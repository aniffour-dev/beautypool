// // "use client";
// // import BookingHeader from "@/app/components/global/booking-header/BookingHeader";
// // import React, { useState, useRef, useEffect } from "react";
// // import api from "@/services/auth";
// // import { useSearchParams } from "next/navigation";
// // import Cookies from "js-cookie";
// // import { IoStar } from "react-icons/io5";
// // import { MdChevronLeft, MdOutlineChevronRight } from "react-icons/md";
// // import { GoHeart } from "react-icons/go";
// // import { GoShareAndroid } from "react-icons/go";

// // // Define interfaces for Article, Review, User, and Service
// // interface User {
// //   first_name: string;
// //   last_name: string;
// // }

// // interface Review {
// //   user_created: User;
// //   date_created: string;
// //   rating: number;
// //   comment: string;
// //   article: number;
// // }

// // interface Article {
// //   id: string;
// //   label: string;
// //   description: string;
// //   reviews: Review[];
// //   featured_image: string;
// //   location: string;
// // }

// // interface Service {
// //   id: string;
// //   Services_id: {
// //     name: string;
// //   };
// //   description: string; // Add content field to Service interface
// // }

// // const Page = () => {
// //   const searchParams = useSearchParams();
// //   const slug = searchParams.get("slug");
// //   const [article, setArticle] = useState<Article | null>(null);
// //   const [services, setServices] = useState<Service[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isOpen, setIsOpen] = React.useState(false);
// //   const [selectedService, setSelectedService] = useState<Service | null>(null); // State to keep track of selected service
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const carouselRef = useRef<HTMLDivElement>(null);
// //   const [isFavoriting, setIsFavoriting] = useState<boolean>(false);

// //   const handleNext = () => {
// //     if (carouselRef.current && currentIndex < services.length - 1) {
// //       setCurrentIndex(currentIndex + 1);
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (carouselRef.current && currentIndex > 0) {
// //       setCurrentIndex(currentIndex - 1);
// //     }
// //   };

// //   useEffect(() => {
// //     if (carouselRef.current) {
// //       const scrollAmount = (currentIndex * carouselRef.current.clientWidth) / 3;
// //       carouselRef.current.scrollTo({
// //         left: scrollAmount,
// //         behavior: "smooth",
// //       });
// //     }
// //   }, [currentIndex]);

// //   useEffect(() => {
// //     const getArticles = async () => {
// //       const savedCategoryId = localStorage.getItem("selectedCategoryId");
// //       const accessToken = Cookies.get("access_token"); // Retrieve the access token from cookies
// //       if (savedCategoryId && accessToken) {
// //         try {
// //           const response = await api.get("/items/articles", {
// //             params: {
// //               filter: {
// //                 category: {
// //                   _eq: savedCategoryId,
// //                 },
// //                 slug: {
// //                   _eq: slug,
// //                 },
// //               },
// //               fields:
// //                 "*,reviews.*,reviews.user_created.first_name,reviews.user_created.last_name",
// //             },
// //             headers: {
// //               Authorization: `Bearer ${accessToken}`,
// //             },
// //           });
// //           const articleData = response.data.data[0];
// //           console.log("Article Data:", articleData);

// //           if (articleData) {
// //             // Adjust the data structure to match the expected format
// //             const adjustedArticleData: Article = {
// //               ...articleData,
// //               reviews: articleData.reviews ? [articleData.reviews] : [],
// //             };
// //             setArticle(adjustedArticleData);

// //             // Fetch services using the article ID
// //             const servicesResponse = await api.get(
// //               `/items/articles_Services?fields[]=Services_id.name&fields[]=id&fields[]=Services_id.description&filter[_and][0][articles_id]=${articleData.id}`
// //             );
// //             setServices(servicesResponse.data.data);
// //           } else {
// //             setArticle(null);
// //           }
// //           setLoading(false);
// //         } catch (error) {
// //           console.error("Error fetching article:", error);
// //           setLoading(false);
// //         }
// //       }
// //     };
// //     getArticles();
// //   }, [slug]);

// //   const handleFavorite = async (article: Article) => {
// //     try {
// //       await api.post("/items/favourites", {
// //         data: {
// //           user_created: "6128350b-c213-485f-b375-9ad7c684fd2d",
// //           article_id: article?.id,
// //           status: "Published",
// //         },
// //       });
// //     } catch {}
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center mx-auto">
// //         <div className="flex justify-center items-center">
// //           <>Loading...</>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!article) {
// //     return (
// //       <div className="flex justify-center items-center mx-auto">
// //         <div className="flex justify-center items-center">
// //           <>No article found</>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="h-screen w-full bg-white">
// //       <div className="hidden lg:block">
// //         <BookingHeader />
// //       </div>
// //       <div className="px-5 lg:px-12 relative top-28">
// //         <div className="">
// //           <ol className="flex items-center whitespace-nowrap">
// //             <li className="inline-flex items-center">
// //               <a
// //                 className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
// //                 href="#"
// //               >
// //                 Home
// //               </a>
// //               <svg
// //                 className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width={24}
// //                 height={24}
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth={2}
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               >
// //                 <path d="m9 18 6-6-6-6" />
// //               </svg>
// //             </li>
// //             <li className="inline-flex items-center">
// //               <a
// //                 className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
// //                 href="#"
// //               >
// //                 Hair Salons
// //                 <svg
// //                   className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   width={24}
// //                   height={24}
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth={2}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 >
// //                   <path d="m9 18 6-6-6-6" />
// //                 </svg>
// //               </a>
// //             </li>
// //             <li
// //               className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
// //               aria-current="page"
// //             >
// //               {article.label}
// //             </li>
// //           </ol>
// //         </div>
// //         <header className="flex flex-col md:flex-row items-start md:items-center justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold">{article.label}</h1>
// //             <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-600 mt-2 md:mt-0">
// //               <span className="flex items-center">
// //                 <i className="fas fa-star text-yellow-500"></i>
// //                 <i className="fas fa-star text-yellow-500"></i>
// //                 <i className="fas fa-star text-yellow-500"></i>
// //                 <i className="fas fa-star text-yellow-500"></i>
// //                 <i className="fas fa-star text-yellow-500"></i>
// //                 <span className="ml-1">(5,113)</span>
// //               </span>
// //               <span className="hidden md:inline mx-2">•</span>
// //               <span>Open until 8:00PM</span>
// //               <span className="hidden md:inline mx-2">•</span>
// //               <span>{article.location}</span>
// //               <a href="#" className="text-blue-600 ml-1">
// //                 Get directions
// //               </a>
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-2 mt-4 md:mt-0">
// //             <button
// //               onClick={() => handleFavorite(article)}
// //               className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full"
// //             >
// //               <GoHeart className="size-6" />
// //             </button>
// //             <button className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full">
// //               <GoShareAndroid className="size-6" />
// //             </button>
// //           </div>
// //         </header>
// //         <div className="mt-5 mb-16">
// //           <div className="lg:flex gap-8">
// //             <div className="lg:w-1/12">
// //               <div className="grid grid-cols-1 gap-4">
// //                 <img
// //                   src="https://placehold.co/400x200"
// //                   alt="Another view of the salon interior"
// //                   className="w-full rounded-lg h-28 object-cover"
// //                 />
// //                 <img
// //                   src="https://placehold.co/400x200"
// //                   alt="Exterior view of the salon building"
// //                   className="w-full rounded-lg h-28 object-cover"
// //                 />
// //                 <button className="text-blue-600">See all Images</button>
// //               </div>
// //             </div>
// //             <div className="lg:w-7/12">
// //               <div className="md:col-span-2">
// //                 <img
// //                   src={`https://maoulaty.shop/assets/${article.featured_image}`}
// //                   alt={article.label}
// //                   className="w-full rounded-lg"
// //                 />
// //               </div>
// //             </div>
// //             <div className="lg:w-4/12">
// //               <div className="bg-white shadow-xl rounded-lg p-4">
// //                 <h1 className="text-4xl font-bold">{article.label}</h1>
// //                 <div className="flex items-center mt-2">
// //                   <span className="text-lg font-bold">5.0</span>
// //                   <span className="ml-1 text-yellow-500 flex justify-center items-center relative -top-[1px]">
// //                     <IoStar />
// //                     <IoStar />
// //                     <IoStar />
// //                     <IoStar />
// //                     <IoStar />
// //                   </span>
// //                   <a href="#" className="ml-2 text-[#f47c66]">
// //                     (5,113)
// //                   </a>
// //                 </div>
// //                 <button className="mt-4 bg-black font-semibold text-white py-3.5 px-4 rounded-lg w-full">
// //                   Book now
// //                 </button>
// //                 <div className="mt-6">
// //                   <div
// //                     className="flex items-center text-green-600 cursor-pointer"
// //                     onClick={() => setIsOpen(!isOpen)}
// //                   >
// //                     <i className="far fa-clock"></i>
// //                     <span className="ml-2">Open until 8:00PM</span>
// //                     <i
// //                       className={`fas fa-chevron-${
// //                         isOpen ? "up" : "down"
// //                       } ml-2`}
// //                     ></i>
// //                   </div>
// //                   {isOpen && (
// //                     <div className="mt-4">
// //                       {[
// //                         {
// //                           day: "Monday",
// //                           time: "09:00 AM – 04:30 PM",
// //                           open: true,
// //                         },
// //                         {
// //                           day: "Tuesday",
// //                           time: "09:00 AM – 04:30 PM",
// //                           open: true,
// //                         },
// //                         {
// //                           day: "Wednesday",
// //                           time: "09:00 AM – 08:00 PM",
// //                           open: true,
// //                         },
// //                         {
// //                           day: "Thursday",
// //                           time: "09:00 AM – 08:00 PM",
// //                           open: true,
// //                           bold: true,
// //                         },
// //                         {
// //                           day: "Friday",
// //                           time: "09:00 AM – 08:00 PM",
// //                           open: true,
// //                         },
// //                         {
// //                           day: "Saturday",
// //                           time: "09:00 AM – 04:30 PM",
// //                           open: true,
// //                         },
// //                         { day: "Sunday", time: "Closed", open: false },
// //                       ].map((item, index) => (
// //                         <div key={index} className="flex items-center mt-2">
// //                           <span
// //                             className={`w-2.5 h-2.5 rounded-full ${
// //                               item.open ? "bg-green-500" : "bg-gray-400"
// //                             }`}
// //                           ></span>
// //                           <span
// //                             className={`ml-2 ${item.bold ? "font-bold" : ""}`}
// //                           >
// //                             {item.day}
// //                           </span>
// //                           <span
// //                             className={`ml-auto ${
// //                               item.bold ? "font-bold" : ""
// //                             }`}
// //                           >
// //                             {item.time}
// //                           </span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="mt-6 flex items-center">
// //                   <i className="fas fa-map-marker-alt text-gray-600"></i>
// //                   <span className="ml-2 text-gray-600">
// //                     12 Whimple Street, Plymouth, England
// //                   </span>
// //                 </div>
// //                 <a href="#" className="text-blue-500 ml-6">
// //                   Get directions
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Display Services Section */}
// //         <section className="mt-5">
// //           <div className="lg:flex">
// //             <div className="lg:w-8/12">
// // <div>
// //   <h1 className="text-3xl font-bold mb-4">Services</h1>
// //   <div className="flex justify-between items-center gap-3">
// //     {/* Carousel Container */}
// //     <div
// //       ref={carouselRef}
// //       className="flex items-center space-x-4 overflow-hidden relative"
// //     >
// //       {services.map((service, index) => (
// //         <div
// //           key={service.id}
// //           className={`px-3 py-1.5 font-semibold text-center rounded-full cursor-pointer ${
// //             index === currentIndex
// //               ? "bg-[#ffd3cb] text-slate-900"
// //               : "bg-transparent"
// //           }`}
// //           onClick={() => setSelectedService(service)}
// //         >
// //           {service.Services_id.name}
// //         </div>
// //       ))}

// //       {/* Mask Effect */}
// //       <div className="absolute top-0 right-0 h-full w-[50px] bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
// //     </div>

// //     {/* Arrows on the Right */}
// //     <div className="flex justify-end items-center gap-0.5">
// //       <button
// //         onClick={handlePrev}
// //         className="text-slate-500 transition"
// //       >
// //         <MdChevronLeft className="size-6" />
// //       </button>
// //       <button
// //         onClick={handleNext}
// //         className="text-slate-500 transition"
// //       >
// //         <MdOutlineChevronRight className="size-6" />
// //       </button>
// //     </div>
// //   </div>
// //               </div>
// //             </div>
// //           </div>
// //           {selectedService && (
// //             <div className="mt-4">
// //               <h2 className="text-2xl font-semibold mb-2">
// //                 {selectedService.Services_id.name}
// //               </h2>
// //               <p>{selectedService.description}</p>
// //             </div>
// //           )}
// //         </section>

// //         {/* Reviews Section */}
// //         <section className="mt-16">
// //           <div className="lg:flex gap-10">
// //             <div className="lg:w-12/12">
// //               <h3 className="text-3xl font-bold mb-4">Reviews</h3>
// //               <div className="relative">
// //                 <div className="">
// //                   {article.reviews && article.reviews.length > 0 ? (
// //                     <>
// //                       <div className="mt-4">
// //                         {article.reviews.map((review, index) => (
// //                           <div
// //                             key={index}
// //                             className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4"
// //                           >
// //                             <div className="flex items-center space-x-4">
// //                               <div className="flex-shrink-0">
// //                                 <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
// //                                   D
// //                                 </div>
// //                               </div>
// //                               <div>
// //                                 <div className="text-lg font-medium text-black">
// //                                   {review.user_created.first_name}{" "}
// //                                   {review.user_created.last_name}
// //                                 </div>
// //                                 <div className="text-gray-500">
// //                                   {review.date_created}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center">
// //                               <div className="flex space-x-1">
// //                                 <IoStar className="fas fa-star text-black" />
// //                                 <IoStar className="fas fa-star text-black" />
// //                                 <IoStar className="fas fa-star text-black" />
// //                                 <IoStar className="fas fa-star text-black" />
// //                                 <IoStar className="fas fa-star text-black" />
// //                               </div>
// //                             </div>
// //                             <div className="text-gray-700">
// //                               {review.comment}
// //                             </div>
// //                             <div>
// //                               <a href="#" className="text-purple-600">
// //                                 Read more
// //                               </a>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </>
// //                   ) : (
// //                     <p>No reviews available</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         <section className="mt-24">
// //           <h3 className="text-3xl font-bold mb-4">About</h3>
// //           <p className="text-black font-medium">{article.description}</p>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;

// "use client";
// import BookingHeader from "@/app/components/global/booking-header/BookingHeader";
// import React, { useState, useRef, useEffect, ReactNode } from "react";
// import api from "@/services/auth";
// import { useParams } from "next/navigation";
// import Cookies from "js-cookie";
// import { IoStar } from "react-icons/io5";
// import {
//   MdChevronLeft,
//   MdChevronRight,
//   MdOutlineChevronRight,
// } from "react-icons/md";
// import { GoHeart } from "react-icons/go";
// import { GoShareAndroid } from "react-icons/go";
// import { CiClock1, CiLocationOn, CiLock } from "react-icons/ci";
// import { FaArrowDown } from "react-icons/fa";
// import Link from "next/link";
// import { BsArrowBarLeft } from "react-icons/bs";
// import BookingSteps from "@/app/components/dynamic/Book/BookingSteps";

// // Define interfaces for Article, Review, User, and Service
// interface UserData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   address: string;
//   phone: string;
// }

// interface Review {
//   user_created: UserData;
//   date_created: string;
//   rating: number;
//   comment: string;
//   article: number;
// }

// interface Article {
//   id: string;
//   label: string;
//   description: string;
//   reviews: Review[];
//   Address: string;
//   featured_image: string;
//   location: string;
// }

// interface Service {
//   description: ReactNode;
//   id: string;
//   Services_id: {
//     name: string;
//     description: string;
//     price: string;
//     duration: string;
//   };
// }

// const Page = () => {
//   const { slug } = useParams();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
//   const [booking, setBooking] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null); // Add userData state

//   const handleNext = () => {
//     if (carouselRef.current && currentIndex < services.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (carouselRef.current && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleBooking = () => {
//     setBooking(true);
//   };

//   useEffect(() => {
//     if (carouselRef.current) {
//       const scrollAmount = (currentIndex * carouselRef.current.clientWidth) / 3;
//       carouselRef.current.scrollTo({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   }, [currentIndex]);

//   useEffect(() => {
//     console.log("useEffect triggered with slug:", slug); // Debugging log
//     const getArticle = async () => {
//       const accessToken = Cookies.get("access_token"); // Retrieve the access token from cookies
//       if (slug && accessToken) {
//         try {
//           const response = await api.get("/items/articles", {
//             params: {
//               filter: {
//                 slug: {
//                   _eq: slug,
//                 },
//               },
//               fields:
//                 "*,reviews.*,reviews.user_created.first_name,reviews.user_created.last_name",
//             },
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           const articleData = response.data.data[0];
//           console.log("Article Data:", articleData); // Debugging log

//           if (articleData) {
//             // Adjust the data structure to match the expected format
//             const adjustedArticleData: Article = {
//               ...articleData,
//               reviews: articleData.reviews ? [articleData.reviews] : [],
//             };
//             setArticle(adjustedArticleData);

//             // Fetch services using the article ID
//             const servicesResponse = await api.get(
//               `/items/articles/${articleData.id}?fields=sub_service.sub_services_id.name,sub_service.sub_services_id.duration,sub_service.sub_services_id.price,sub_service.sub_services_id.description,sub_service.sub_services_id.parent_service.name,sub_service.sub_services_id.parent_service.description`
//             );
//             setServices(servicesResponse.data.data);
//           } else {
//             setArticle(null);
//           }
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching article:", error);
//           setLoading(false);
//         }
//       }
//     };
//     getArticle();

//     // Cleanup function to clear state on unmount
//     return () => {
//       setArticle(null);
//       setServices([]);
//       setLoading(true);
//     };
//   }, [slug]);

//   const handleFavorite = async (article: Article) => {
//     try {
//       await api.post("/items/favourites", {
//         data: {
//           user_created: "6128350b-c213-485f-b375-9ad7c684fd2d",
//           article_id: article?.id,
//           status: "Published",
//         },
//       });
//     } catch {}
//   };

//   console.log("Rendering with slug:", slug); // Debugging log

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center mx-auto">
//         <div className="flex justify-center items-center">
//           <>Loading...</>
//         </div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="flex justify-center items-center mx-auto">
//         <div className="flex justify-center items-center">
//           <>No article found</>
//         </div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="flex justify-center items-center mx-auto">
//         <div className="flex justify-center items-center">
//           <>No article found</>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen w-full bg-white" key={article.id}>
//       <div className="hidden lg:block">
//         <BookingHeader />
//       </div>
//       <div className="px-5 lg:px-12 relative top-28">
//         <div className="">
//           <ol className="flex items-center whitespace-nowrap">
//             <li className="inline-flex items-center">
//               <Link
//                 className="flex items-center text-sm text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
//                 href="#"
//               >
//                 Home
//               </Link>
//               <svg
//                 className="shrink-0 mx-2 size-4 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width={24}
//                 height={24}
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="m9 18 6-6-6-6" />
//               </svg>
//             </li>
//             <li className="inline-flex items-center">
//               <Link
//                 className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
//                 href="#"
//               >
//                 Hair Salons
//                 <svg
//                   className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width={24}
//                   height={24}
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="m9 18 6-6-6-6" />
//                 </svg>
//               </Link>
//             </li>
//             <li
//               className="inline-flex items-center text-sm font-semibold text-gray-500 truncate"
//               aria-current="page"
//             >
//               {article.label}
//             </li>
//           </ol>
//         </div>
//         <header className="flex flex-col md:flex-row mt-3 items-start md:items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">{article.label}</h1>
//             <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-600 mt-3">
//               <span className="text-lg font-bold mr-1 text-black">5.0</span>
//               <span className="flex items-center">
//                 <IoStar className="text-yellow-500" />
//                 <IoStar className="text-yellow-500" />
//                 <IoStar className="text-yellow-500" />
//                 <IoStar className="text-yellow-500" />
//                 <IoStar className="text-yellow-500" />
//                 <span className="ml-1 text-[#dd0067dc] font-semibold">(5,113)</span>
//               </span>
//               <span className="hidden md:inline mx-2">•</span>
//               <span>Open until 8:00PM</span>
//               <span className="hidden md:inline mx-2">•</span>
//               <span>{article.location}</span>
//               <Link
//                 href={`https://www.google.com/maps?q=${article.Address}`}
//                 target="_blank"
//                 className="text-[#dd0067dc] ml-1 font-semibold"
//               >
//                 Get directions
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2 mt-4 md:mt-0">
//             <button
//               onClick={() => handleFavorite(article)}
//               className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full"
//             >
//               <GoHeart className="size-6" />
//             </button>
//             <button className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full">
//               <GoShareAndroid className="size-6" />
//             </button>
//           </div>
//         </header>
//         <div className="mt-8 mb-16">
//           <div className="lg:flex gap-8">
//             <div className="lg:w-1/12">
//               <div className="grid grid-cols-1 gap-4">
//                 <img
//                   src={`https://maoulaty.shop/assets/${article.featured_image}`}
//                   alt="Another view of the salon interior"
//                   className="w-full rounded-lg h-28 object-cover"
//                 />
//                 <img
//                   src={`https://maoulaty.shop/assets/${article.featured_image}`}
//                   alt="Exterior view of the salon building"
//                   className="w-full rounded-lg h-28 object-cover"
//                 />
//                 <img
//                   src={`https://maoulaty.shop/assets/${article.featured_image}`}
//                   alt="Exterior view of the salon building"
//                   className="w-full rounded-lg h-28 object-cover"
//                 />
//                 <button className="text-violet-500 text-sm font-semibold">
//                   See all Images
//                 </button>
//               </div>
//             </div>
//             <div className="lg:w-7/12">
//               <div className="md:col-span-2">
//                 <img
//                   src={`https://maoulaty.shop/assets/${article.featured_image}`}
//                   alt={article.label}
//                   className="w-full rounded-lg"
//                 />
//               </div>
//             </div>
//             <div className="lg:w-4/12">
//               <div className="bg-white shadow-xl rounded-lg p-4 flex flex-col sticky top-0">
//                 <h1 className="text-4xl font-bold">{article.label}</h1>
//                 <div className="flex items-center mt-2">
//                   <span className="text-lg font-bold">5.0</span>
//                   <span className="ml-1 text-yellow-500 flex justify-center items-center relative -top-[1px]">
//                     <IoStar />
//                     <IoStar />
//                     <IoStar />
//                     <IoStar />
//                     <IoStar />
//                   </span>
//                   <Link href="#reviews" className="ml-2 text-[#dd0067dc] font-semibold">
//                     (5,113)
//                   </Link>
//                 </div>
//                 <button
//                   onClick={handleBooking}
//                   className="mt-4 bg-black font-semibold text-white py-3.5 px-4 rounded-lg w-full"
//                 >
//                   Book now
//                 </button>
//                 <div className="mt-6">
//                   <div
//                     className="flex items-center text-green-600 cursor-pointer"
//                     onClick={() => setIsOpen(!isOpen)}
//                   >
//                     <CiClock1 className="size-7 text-slate-600 -mr-0.5" />
//                     <span className="ml-2">Open until 8:00PM</span>
//                     <FaArrowDown
//                       className={`fas fa-chevron-${
//                         isOpen ? "up" : "down"
//                       } ml-2`}
//                     ></FaArrowDown>
//                   </div>
//                   {isOpen && (
//                     <div className="mt-4">
//                       {[
//                         {
//                           day: "Monday",
//                           time: "09:00 AM – 04:30 PM",
//                           open: true,
//                         },
//                         {
//                           day: "Tuesday",
//                           time: "09:00 AM – 04:30 PM",
//                           open: true,
//                         },
//                         {
//                           day: "Wednesday",
//                           time: "09:00 AM – 08:00 PM",
//                           open: true,
//                         },
//                         {
//                           day: "Thursday",
//                           time: "09:00 AM – 08:00 PM",
//                           open: true,
//                           bold: true,
//                         },
//                         {
//                           day: "Friday",
//                           time: "09:00 AM – 08:00 PM",
//                           open: true,
//                         },
//                         {
//                           day: "Saturday",
//                           time: "09:00 AM – 04:30 PM",
//                           open: true,
//                         },
//                         { day: "Sunday", time: "Closed", open: false },
//                       ].map((item, index) => (
//                         <div key={index} className="flex items-center mt-2">
//                           <span
//                             className={`w-2.5 h-2.5 rounded-full ${
//                               item.open ? "bg-green-500" : "bg-gray-400"
//                             }`}
//                           ></span>
//                           <span
//                             className={`ml-2 ${item.bold ? "font-bold" : ""}`}
//                           >
//                             {item.day}
//                           </span>
//                           <span
//                             className={`ml-auto ${
//                               item.bold ? "font-bold" : ""
//                             }`}
//                           >
//                             {item.time}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-3.5 flex items-center">
//                   <CiLocationOn className="text-gray-600 size-7" />
//                   <span className="ml-2 text-gray-600">{article.Address}<br /><Link
//                   href={`https://www.google.com/maps?q=${article.Address}`}
//                   target="_blank"
//                   className="text-[#dd0067dc] ml-0 font-semibold"
//                 >
//                   Get directions
//                 </Link></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Display Services Section */}
//         <section className="mt-5">
//           <div className="lg:flex">
//             <div className="lg:w-8/12">
//               <div>
//                 <h1 className="text-3xl font-bold mb-4">Services</h1>
//                 <div className="flex justify-between items-center gap-3">
//                   {/* Carousel Container */}
//                   <div
//                     ref={carouselRef}
//                     className="flex items-center space-x-4 overflow-hidden relative"
//                   >
//                     {services.map((service, index) => (
//                       <div
//                         key={service.id}
//                         className={`px-3 py-1.5 font-semibold text-center rounded-full cursor-pointer ${
//                           index === currentIndex
//                             ? "bg-violet-100 text-slate-900"
//                             : "bg-transparent"
//                         }`}
//                         onClick={() => setSelectedService(service)}
//                       >
//                         {service.Services_id.name}
//                       </div>
//                     ))}

//                     {/* Mask Effect */}
//                     <div className="absolute top-0 right-0 h-full w-[50px] bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
//                   </div>

//                   {/* Arrows on the Right */}
//                   <div className="flex justify-end items-center gap-0.5">
//                     <button
//                       onClick={handlePrev}
//                       className="text-slate-500 transition"
//                     >
//                       <MdChevronLeft className="size-6" />
//                     </button>
//                     <button
//                       onClick={handleNext}
//                       className="text-slate-500 transition"
//                     >
//                       <MdOutlineChevronRight className="size-6" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {selectedService && (
//                 // <div className="mt-4">
//                 //   <h2 className="text-2xl font-semibold mb-2 text-slate-400">
//                 //     {selectedService.Services_id.name}
//                 //   </h2>
//                 //   <p className="text-slate-400">
//                 //     {selectedService.description}
//                 //   </p>
//                 // </div>
//                 <div className="mt-10">
//                 <div className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
//                   <div>
//                     <h2 className="text-lg font-semibold">{selectedService.Services_id.name}</h2>
//                     <p className="text-gray-500">
//                       {selectedService.Services_id.duration}
//                     </p>
//                     <p className="text-lg font-semibold mt-2 text-[#dd0067dc]">
//                     €{selectedService.Services_id.price}
//                     </p>
//                   </div>
//                   <button className="border rounded-full px-4 py-2 text-sm font-semibold bg-slate-900 text-slate-100 duration-300 transition-all hover:text-slate-900 hover:bg-gray-100">
//                     Book now
//                   </button>
//                 </div>
//               </div>
//               )}

//               {/* Reviews Section */}
//               <div className="mt-16" id="reviews">
//                 <div className="lg:flex gap-10">
//                   <div className="lg:w-12/12">
//                     <h3 className="text-3xl font-bold mb-4">Reviews</h3>
//                     <div className="relative">
//                       <div className="">
//                         {article.reviews && article.reviews.length > 0 ? (
//                           <>
//                             <div className="mt-4">
//                               {article.reviews.map((review, index) => (
//                                 <div
//                                   key={index}
//                                   className="max-w-md mx-auto space-y-4 mt-5"
//                                 >
//                                   <div className="flex items-center space-x-4">
//                                     <div className="flex-shrink-0">
//                                       <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
//                                         D
//                                       </div>
//                                     </div>
//                                     <div>
//                                       <div className="text-lg font-medium text-black">
//                                         {review.user_created.first_name}{" "}
//                                         {review.user_created.last_name}
//                                       </div>
//                                       <div className="text-gray-500">
//                                         {review.date_created}
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="flex items-center">
//                                     <div className="flex space-x-1">
//                                       <IoStar className="fas fa-star text-black" />
//                                       <IoStar className="fas fa-star text-black" />
//                                       <IoStar className="fas fa-star text-black" />
//                                       <IoStar className="fas fa-star text-black" />
//                                       <IoStar className="fas fa-star text-black" />
//                                     </div>
//                                   </div>
//                                   <div className="text-gray-700">
//                                     {review.comment}
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </>
//                         ) : (
//                           <p>No reviews available</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-24">
//                 <h3 className="text-3xl font-bold mb-4">About</h3>
//                 <p className="text-black font-medium">{article.description}</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       {booking && (
//         <div className="bg-white fixed left-0 top-0 w-full h-full z-50 p-10 overflow-auto">
//           <div>
//             <BookingSteps
//               article={article}
//               onClose={() => setBooking(false)}
//               services={services}
//               userData={userData?.userData}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import BookingHeader from "@/components/global/booking-header/BookingHeader";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import api from "@/services/auth";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { IoStar } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import BookingSteps from "@/components/dynamic/Book/Steps/BookingSteps";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

// Define interfaces for Article, Review, User, and Service
interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
}

interface Review {
  user_created: UserData;
  date_created: string;
  rating: number;
  comment: string;
  article: number;
}

interface Article {
  id: string;
  label: string;
  description: string;
  reviews: Review[];
  Address: string;
  featured_image: string;
  location: string;
}

interface SubService {
  name: string;
  description: string;
  price: string;
  duration: string;
}

interface ParentService {
  name: string;
  description: string;
  sub_services: SubService[];
}

interface Service {
  id: string;
  parent_service: ParentService;
}

const singleBook = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService] = useState<Service | null>(null);
  const [currentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  // const [isFavoriting, ] = useState<boolean>(false);
  const [booking, setBooking] = useState(false);
  const [userData] = useState<UserData | null>(null); // Add userData state

  const handleBooking = () => {
    setBooking(true);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = (currentIndex * carouselRef.current.clientWidth) / 3;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log("useEffect triggered with slug:", slug); // Debugging log
    const getArticle = async () => {
      const accessToken = Cookies.get("access_token"); // Retrieve the access token from cookies
      if (slug && accessToken) {
        try {
          const response = await api.get("/items/articles", {
            params: {
              filter: {
                slug: {
                  _eq: slug,
                },
              },
              fields:
                "*,reviews.*,reviews.user_created.first_name,reviews.user_created.last_name",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const articleData = response.data.data[0];
          console.log("Article Data:", articleData); // Debugging log

          if (articleData) {
            // Adjust the data structure to match the expected format
            const adjustedArticleData: Article = {
              ...articleData,
              reviews: articleData.reviews ? [articleData.reviews] : [],
            };
            setArticle(adjustedArticleData);

            // Fetch services using the article ID
            const servicesResponse = await api.get(
              `/items/articles/${articleData.id}?fields=sub_service.sub_services_id.name,sub_service.sub_services_id.duration,sub_service.sub_services_id.price,sub_service.sub_services_id.description,sub_service.sub_services_id.parent_service.name,sub_service.sub_services_id.parent_service.description`
            );
            const parentServices: { [key: string]: ParentService } = {};

            servicesResponse.data.data.sub_service.forEach((service: any) => {
              const parentServiceName =
                service.sub_services_id.parent_service.name;
              if (!parentServices[parentServiceName]) {
                parentServices[parentServiceName] = {
                  name: parentServiceName,
                  description:
                    service.sub_services_id.parent_service.description,
                  sub_services: [],
                };
              }
              parentServices[parentServiceName].sub_services.push({
                name: service.sub_services_id.name,
                description: service.sub_services_id.description,
                price: service.sub_services_id.price,
                duration: service.sub_services_id.duration,
              });
            });

            setServices(
              Object.keys(parentServices).map((key, index) => ({
                id: String(index),
                parent_service: parentServices[key],
              }))
            );
          } else {
            setArticle(null);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching article:", error);
          setLoading(false);
        }
      }
    };
    getArticle();

    // Cleanup function to clear state on unmount
    return () => {
      setArticle(null);
      setServices([]);
      setLoading(true);
    };
  }, [slug]);

  const handleFavorite = async (article: Article) => {
    try {
      await api.post("/items/favourites", {
        data: {
          user_created: "6128350b-c213-485f-b375-9ad7c684fd2d",
          article_id: article?.id,
          status: "Published",
        },
      });
    } catch {}
  };

  console.log("Rendering with slug:", slug); // Debugging log

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <div className="flex justify-center items-center">
          <>Loading...</>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <div className="flex justify-center items-center">
          <>No article found</>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white" key={article.id}>
      <div className="hidden lg:block">
        <BookingHeader />
      </div>
      <div className="px-5 lg:px-12 relative top-28">
        <div className="">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <Link
                className="flex items-center text-sm text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                href="#"
              >
                Home
              </Link>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </li>
            <li className="inline-flex items-center">
              <Link
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                href="#"
              >
                Hair Salons
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </li>
            <li
              className="inline-flex items-center text-sm font-semibold text-gray-500 truncate"
              aria-current="page"
            >
              {article.label}
            </li>
          </ol>
        </div>
        <header className="flex flex-col md:flex-row mt-3 items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{article.label}</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-600 mt-3">
              <span className="text-lg font-bold mr-1 text-black">5.0</span>
              <span className="flex items-center">
                <IoStar className="text-yellow-500" />
                <IoStar className="text-yellow-500" />
                <IoStar className="text-yellow-500" />
                <IoStar className="text-yellow-500" />
                <IoStar className="text-yellow-500" />
                <span className="ml-1 text-[#dd0067dc] font-semibold">
                  (5,113)
                </span>
              </span>
              <span className="hidden md:inline mx-2">•</span>
              <span>Open until 8:00PM</span>
              <span className="hidden md:inline mx-2">•</span>
              <span>{article.location}</span>
              <Link
                href={`https://www.google.com/maps?q=${article.Address}`}
                target="_blank"
                className="text-[#dd0067dc] ml-1 font-semibold"
              >
                Get directions
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => handleFavorite(article)}
              className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full"
            >
              <GoHeart className="size-6" />
            </button>
            <button className="text-gray-800 border border-slate-200 h-12 w-12 flex justify-center items-center rounded-full">
              <GoShareAndroid className="size-6" />
            </button>
          </div>
        </header>
        <div className="mt-8 mb-16">
          <div className="lg:flex gap-8">
            <div className="lg:w-1/12">
              <div className="grid grid-cols-1 gap-4">
                <img
                  src={`https://maoulaty.shop/assets/${article.featured_image}`}
                  alt="Another view of the salon interior"
                  className="w-full rounded-lg h-28 object-cover"
                />
                <img
                  src={`https://maoulaty.shop/assets/${article.featured_image}`}
                  alt="Exterior view of the salon building"
                  className="w-full rounded-lg h-28 object-cover"
                />
                <img
                  src={`https://maoulaty.shop/assets/${article.featured_image}`}
                  alt="Exterior view of the salon building"
                  className="w-full rounded-lg h-28 object-cover"
                />
                <button className="text-violet-500 text-sm font-semibold">
                  See all Images
                </button>
              </div>
            </div>
            <div className="lg:w-7/12">
              <div className="md:col-span-2">
                <img
                  src={`https://maoulaty.shop/assets/${article.featured_image}`}
                  alt={article.label}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="lg:w-4/12">
              <div className="bg-white shadow-xl rounded-lg p-4 flex flex-col sticky top-0">
                <h1 className="text-4xl font-bold">{article.label}</h1>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold">5.0</span>
                  <span className="ml-1 text-yellow-500 flex justify-center items-center relative -top-[1px]">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                  </span>
                  <Link
                    href="#reviews"
                    className="ml-2 text-[#dd0067dc] font-semibold"
                  >
                    (5,113)
                  </Link>
                </div>
                <button
                  onClick={handleBooking}
                  className="mt-4 bg-black font-semibold text-white py-3.5 px-4 rounded-lg w-full"
                >
                  Book now
                </button>
                <div className="mt-6">
                  <div
                    className="flex items-center text-green-600 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <CiClock1 className="size-7 text-slate-600 -mr-0.5" />
                    <span className="ml-2">Open until 8:00PM</span>
                    <FaArrowDown
                      className={`fas fa-chevron-${
                        isOpen ? "up" : "down"
                      } ml-2`}
                    ></FaArrowDown>
                  </div>
                  {isOpen && (
                    <div className="mt-4">
                      {[
                        {
                          day: "Monday",
                          time: "09:00 AM – 04:30 PM",
                          open: true,
                        },
                        {
                          day: "Tuesday",
                          time: "09:00 AM – 04:30 PM",
                          open: true,
                        },
                        {
                          day: "Wednesday",
                          time: "09:00 AM – 08:00 PM",
                          open: true,
                        },
                        {
                          day: "Thursday",
                          time: "09:00 AM – 08:00 PM",
                          open: true,
                          bold: true,
                        },
                        {
                          day: "Friday",
                          time: "09:00 AM – 08:00 PM",
                          open: true,
                        },
                        {
                          day: "Saturday",
                          time: "09:00 AM – 04:30 PM",
                          open: true,
                        },
                        { day: "Sunday", time: "Closed", open: false },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              item.open ? "bg-green-500" : "bg-gray-400"
                            }`}
                          ></span>
                          <span
                            className={`ml-2 ${item.bold ? "font-bold" : ""}`}
                          >
                            {item.day}
                          </span>
                          <span
                            className={`ml-auto ${
                              item.bold ? "font-bold" : ""
                            }`}
                          >
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3.5 flex items-center">
                  <CiLocationOn className="text-gray-600 size-7" />
                  <span className="ml-2 text-gray-600">
                    {article.Address}
                    <br />
                    <Link
                      href={`https://www.google.com/maps?q=${article.Address}`}
                      target="_blank"
                      className="text-[#dd0067dc] ml-0 font-semibold"
                    >
                      Get directions
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Services Section */}
        <section className="mt-5">
          <div className="lg:flex">
            <div className="lg:w-8/12">
              <div>
                <h1 className="text-3xl font-bold mb-4">Services</h1>
                <Tabs value="html">
                  <div className="flex justify-between items-center gap-3">
                    <TabsHeader
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {services.map(({ label, value }: any) => (
                        <Tab
                          key={value}
                          value={value}
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          {label}
                        </Tab>
                      ))}
                    </TabsHeader>
                  </div>
                  {selectedService && (
                    <div className="mt-10">
                      <TabsBody
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                      >
                        {selectedService.parent_service.sub_services.map(
                          (subService, subIndex) => (
                            <TabPanel key={subIndex} value={subService.name}>
                              <p>{subService.description}</p>
                            </TabPanel>
                          )
                        )}
                      </TabsBody>
                    </div>
                  )}
                </Tabs>

                {/* Reviews Section */}
                <div className="mt-16" id="reviews">
                  <div className="lg:flex gap-10">
                    <div className="lg:w-12/12">
                      <h3 className="text-3xl font-bold mb-4">Reviews</h3>
                      <div className="relative">
                        <div className="">
                          {article.reviews && article.reviews.length > 0 ? (
                            <>
                              <div className="mt-4">
                                {article.reviews.map((review, index) => (
                                  <div
                                    key={index}
                                    className="max-w-md mx-auto space-y-4 mt-5"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
                                          D
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-lg font-medium text-black">
                                          {review.user_created.first_name}{" "}
                                          {review.user_created.last_name}
                                        </div>
                                        <div className="text-gray-500">
                                          {review.date_created}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="flex space-x-1">
                                        <IoStar className="fas fa-star text-black" />
                                        <IoStar className="fas fa-star text-black" />
                                        <IoStar className="fas fa-star text-black" />
                                        <IoStar className="fas fa-star text-black" />
                                        <IoStar className="fas fa-star text-black" />
                                      </div>
                                    </div>
                                    <div className="text-gray-700">
                                      {review.comment}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <p>No reviews available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-24">
                  <h3 className="text-3xl font-bold mb-4">About</h3>
                  <p className="text-black font-medium">
                    {article.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {booking && (
        <div className="bg-white fixed left-0 top-0 w-full h-full z-50 p-10 overflow-auto">
          <div>
            {/* <BookingSteps
              article={article}
              onClose={() => setBooking(false)}
              services={services}
              userData={userData?.userData}
            /> */}
            <>asratsry</>
          </div>
        </div>
      )}
    </div>
  );
};

export default singleBook;
