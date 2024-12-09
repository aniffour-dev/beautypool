// // "use client";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";
// // import Cookies from "js-cookie";
// // import api from "@/services/auth";

// // const Login = () => {
// // const [email, setEmail] = useState("");
// // const [password, setPassword] = useState("");
// // const [loading, setLoading] = useState(false);
// // const [error, setError] = useState<string | null>(null);
// // const router = useRouter();

// const handleLogin = async () => {
//   setLoading(true);
//   setError(null);

//   try {
//     const response = await api.post("/auth/login", { email, password });
//     const { access_token, refresh_token } = response.data.data;

//     const setAccessToken = (token: string) =>
//       Cookies.set("access_token", token, { expires: 0.5 / 24 });
//     const setRefreshToken = (token: string) =>
//       Cookies.set("refresh_token", token, { expires: 30 });

//     setAccessToken(access_token);
//     setRefreshToken(refresh_token);

//     router.push("/");
//   } catch (loginError) {
//     setError("Login failed. Please check your credentials.");
//     console.error("Login error:", loginError);
//   } finally {
//     setLoading(false);
//   }
// };

// //   return (
// // <form onSubmit={handleLogin}>
// //   <div className="relative mb-3">
// //     <div>
// //       <input
// //         type="email"
// //         id="floatingInput"
// //         placeholder="name@example.com"
// //         name="email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       {/* <label
// //         htmlFor="floatingInput"
// //         className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-slate-600 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-pink-600 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-slate-400 dark:peer-focus:text-pink-600"
// //       >
// //         Email address
// //       </label> */}
// //     </div>
// //     {/* {errors.email && (
// //         <p
// //           className="text-left font-bold text-[13px] mt-1 w-full flex justify-start"
// //           style={{ color: "rgb(255 0 0 / 74%)" }}
// //         >{errors.email}</p>
// //       )} */}
// //   </div>

// //   <div className="relative mb-3">
// //     <div>
// //       <input
// //         type="password"
// //         id="floatingInput"
// //         placeholder="Password"
// //         name="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       {/* <label
// //         htmlFor="floatingInput"
// //         className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-slate-600 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-pink-600 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-slate-400 dark:peer-focus:text-pink-600"
// //       >
// //         Password
// //       </label> */}
// //     </div>
// //     {/* {errors.password && (
// //         <p
// //           className="text-left font-bold text-[13px] mt-1 w-full flex justify-start"
// //           style={{ color: "rgb(255 0 0 / 74%)" }}
// //         >{errors.password}</p>
// //       )} */}
// //   </div>

// //   <div className="lg:flex justify-center items-center mt-[15px] gap-2 space-y-2 md:space-y-0">
// //     <button
// //       className="items-center py-2.5 px-5 w-full md:w-auto rounded-full font-bold btn-signup bg-black text-white capitalize text-md"
// //       type="submit"
// //       disabled={loading}
// //       onClick={handleLogin}
// //     >
// //       {loading ? (
// //         <div className="flex items-center justify-between">
// //           <span>Signing in...</span>
// //           <svg
// //             aria-hidden="true"
// //             className="inline w-6 h-6 text-white animate-spin fill-white ml-1"
// //             viewBox="0 0 100 101"
// //             fill="none"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
// //               fill="currentColor"
// //             />
// //             <path
// //               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
// //               fill="currentFill"
// //             />
// //           </svg>
// //         </div>
// //       ) : (
// //         <span>Sign In</span>
// //       )}
// //     </button>
// //     <div className="flex items-center justify-center">
// //       <button className="px-4 py-2 w-full md:w-auto border flex gap-2 rounded-full text-slate-700 border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
// //         <img
// //           className="w-6 h-6"
// //           src="https://www.svgrepo.com/show/475656/google-color.svg"
// //           loading="lazy"
// //           alt="google logo"
// //         />
// //         <span>Login with Google</span>
// //       </button>
// //     </div>
// //   </div>
// // </form>
// //   );
// // };

// // export default Login;

// "use client";
// import React from "react";
// import { IoIosArrowDropright } from "react-icons/io";
// import Link from "next/link";
// import BG from "../../../../public/assets/register.webp";
// import localFont from "next/font/local";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import LoginCustomer from "./logins/LoginCustomer";
// import LoginBusiness from "./logins/LoginBusiness";

// const GDSageBold = localFont({
//   src: "../../fonts/GDSage-Bold.ttf",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const Register = () => {
//   const [cutomers, setCustomers] = React.useState(false);
//   const [business, setBusiness] = React.useState(false);
//   const [formselection, setFormSelection] = React.useState(true);

//   const handleBusiness = () => {
//     setBusiness(true);
//     setCustomers(false);
//     setFormSelection(false);
//   };

//   const handleCustomer = () => {
//     setCustomers(true);
//     setBusiness(false);
//     setFormSelection(false);
//   };

//   return (
//     <div className="lg:flex">
//       {/* Left side: Fixed background image */}
//       <div className="lg:w-7/12 hidden lg:block fixed top-0 left-0 h-full">
//         <div
//           className="min-h-screen w-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${"" + BG.src + ""})`,
//             height: "100vh",
//           }}
//         >
//           <div className="h-full w-full bg-gradient-to-r px-5 lg:px-0 from-[#f4b8ae]/60 via-[#f9c8bf]/60 to-[#f48673]/60  flex items-center justify-center"></div>
//         </div>
//       </div>

//       {/* Right side: Scrollable content */}
//       <div className="lg:w-5/12 ml-auto h-screen overflow-y-auto">
//         <div className="bg-white min-h-screen w-full p-10">
//           <div className="flex justify-start">
//             <Link href="/">
//               <MdOutlineKeyboardBackspace className="size-7 text-gray-600" />
//             </Link>
//           </div>
//           {formselection && (
//             <>
//               <h2
//                 className={`${GDSageBold.className} text-2xl md:text-3xl my-5 text-gray-800 text-center font-serif`}
//               >
//                 Sign In to BeautyPool
//               </h2>
//               <div className="flex flex-col items-center space-y-4 p-4">
//                 <button
//                   onClick={handleCustomer}
//                   className="w-full max-w-md p-4 border rounded-lg shadow-sm flex justify-between items-center transition-all hover:bg-slate-100"
//                 >
//                   <div>
//                     <h2 className="text-lg font-semibold text-left">
//                       Customers
//                     </h2>
//                     <p className="text-gray-600">
//                       Book salons and spas near you
//                     </p>
//                   </div>
//                   <IoIosArrowDropright className="size-7 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={handleBusiness}
//                   className="w-full max-w-md p-4 border rounded-lg shadow-sm flex justify-between items-center transition-all hover:bg-slate-100"
//                 >
//                   <div>
//                     <h2 className="text-lg font-semibold text-left">
//                       Business
//                     </h2>
//                     <p className="text-gray-600">
//                       Manage and grow your business
//                     </p>
//                   </div>
//                   <IoIosArrowDropright className="size-7 text-gray-600" />
//                 </button>
//               </div>
//             </>
//           )}
//           {cutomers && <LoginCustomer />}
//           {business && <LoginBusiness />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

"use client";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import Link from "next/link";
import BG from "../../../../public/assets/register.webp";
import localFont from "next/font/local";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import LoginCustomer from "./logins/LoginCustomer";
import LoginBusiness from "./logins/LoginBusiness";

const GDSageBold = localFont({
  src: "../../fonts/GDSage-Bold.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Register = () => {
  const [cutomers, setCustomers] = React.useState(false);
  const [business, setBusiness] = React.useState(false);
  const [formselection, setFormSelection] = React.useState(true);

  const handleBusiness = () => {
    setBusiness(true);
    setCustomers(false);
    setFormSelection(false);
  };

  const handleCustomer = () => {
    setCustomers(true);
    setBusiness(false);
    setFormSelection(false);
  };

  return (
    <div className="lg:flex">
      {/* Left side: Fixed background image */}
      <div className="lg:w-7/12 hidden lg:block fixed top-0 left-0 h-full">
        <div
          className="min-h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${"" + BG.src + ""})`,
            height: "100vh",
          }}
        >
          <div className="h-full w-full bg-gradient-to-r px-5 lg:px-0 from-[#f4b8ae]/60 via-[#f9c8bf]/60 to-[#f48673]/60  flex items-center justify-center"></div>
        </div>
      </div>

      {/* Right side: Scrollable content */}
      <div className="lg:w-5/12 ml-auto h-screen overflow-y-auto">
        <div className="bg-white min-h-screen w-full p-10">
          <div className="flex justify-start">
            <Link href="/">
              <MdOutlineKeyboardBackspace className="size-7 text-gray-600" />
            </Link>
          </div>
          {formselection && (
            <>
              <h2
                className={`${GDSageBold.className} text-2xl md:text-3xl my-5 text-gray-800 text-center font-serif`}
              >
                Sign In to BeautyPool
              </h2>
              <div className="flex flex-col items-center space-y-4 p-4">
                <button
                  onClick={handleCustomer}
                  className="w-full max-w-md p-4 border rounded-lg shadow-sm flex justify-between items-center transition-all hover:bg-slate-100"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-left">
                      Customers
                    </h2>
                    <p className="text-gray-600">
                      Book salons and spas near you
                    </p>
                  </div>
                  <IoIosArrowDropright className="size-7 text-gray-600" />
                </button>
                <button
                  onClick={handleBusiness}
                  className="w-full max-w-md p-4 border rounded-lg shadow-sm flex justify-between items-center transition-all hover:bg-slate-100"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-left">
                      Business
                    </h2>
                    <p className="text-gray-600">
                      Manage and grow your business
                    </p>
                  </div>
                  <IoIosArrowDropright className="size-7 text-gray-600" />
                </button>
              </div>
            </>
          )}
          {cutomers && <LoginCustomer />}
          {business && <LoginBusiness />}
        </div>
      </div>
    </div>
  );
};

export default Register;
