"use client";
import React, { useEffect, useState } from "react";
import BookingHeader from "@/components/global/booking-header/BookingHeader";
import Sidenav from "@/components/dynamic/Accounts/Customer/Sidenav";
import { useRouter } from "next/navigation";
import api from "@/services/auth";
import EditModal from "@/components/dynamic/Accounts/Customer/Profile/EditProfile";
import { TbHome } from "react-icons/tb";
import { MdOutlineBusinessCenter } from "react-icons/md";
import HomeAddress from "@/components/dynamic/Accounts/Customer/Profile/HomeAddress";
import WorkAddress from "@/components/dynamic/Accounts/Customer/Profile/WorkAddress";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const CustomerProfile = () => {
  const [profileImage, setProfileImage] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [homeaddressmodal, setHomeAddressmodal] = useState(false);
  const [workaddressesModal, setWorkAddressmodal] = useState(false);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await api.get("/users/me");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      }
    };
    getMe();
  }, [router]);

  // useEffect(() => {
  //   const accessToken = Cookies.get("access_token");
  //   console.log("Access Token:", accessToken);
  //   setIsAuthenticated(!!accessToken);
  // }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload the image to Directus
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "8027ec09-38ca-4def-8555-acf8ad6677d7"); // Replace with your folder ID

      try {
        const response = await axios.post(
          "http://109.199.103.20:2022/files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageId = response.data.data.id;

        // Update the user's avatar with the new image ID
        await api.patch(`/users/${userData.id}`, { avatar: imageId });

        // Update the user data state with the new avatar
        setUserData((prevData: any) => ({
          ...prevData,
          avatar: imageId,
        }));

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile picture updated successfully!",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const openHomeAddressModal = () => {
    setHomeAddressmodal(true);
  };
  const openWorkAddressModal = () => {
    setWorkAddressmodal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="hidden lg:block">
        <BookingHeader />
        <Sidenav />
      </div>
      <div className="ml-0 lg:ml-64 p-5 xl:pt-32 xl:pl-14 overflow-auto bg-slate-100 h-screen">
        {userData ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Profile</h1>
            <div className="lg:flex gap-10 mb-10">
              <div className="lg:w-4/12">
                <div className="p-5 border-[1px] bg-white border-slate-200 shadow-sm rounded-xl">
                  <div className="flex justify-end">
                    <button
                      onClick={openModal}
                      className="text-violet-700 font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-col items-center mt-4">
                    <div className="relative">
                      <div
                        className="bg-violet-100 rounded-full bg-cover bg-center h-24 w-24 flex items-center justify-center text-violet-700 text-3xl font-bold overflow-hidden"
                        style={
                          userData.avatar
                            ? {
                                backgroundImage: `url(http://109.199.103.20:2022/assets/${userData.avatar})`,
                              }
                            : {}
                        }
                      >
                        {profileImage ? (
                          <img
                            src={
                              typeof profileImage === "string"
                                ? profileImage
                                : URL.createObjectURL(new Blob([profileImage]))
                            }
                            alt="Profile"
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : userData.avatar ? null : (
                          <>
                            {userData.first_name?.[0]?.toUpperCase()}
                            {userData.last_name?.[0]?.toUpperCase()}
                          </>
                        )}
                      </div>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                        <label htmlFor="fileInput">
                          <AiOutlineCamera className="fas fa-pen text-gray-500" />
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold mt-4">
                      {userData.first_name} {userData.last_name}
                    </h2>
                  </div>
                  <hr className="my-4" />
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="font-semibold">First name</span>
                      <p className="text-gray-500">{userData.first_name}</p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Last name</span>
                      <p className="text-gray-500">{userData.last_name}</p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Mobile number</span>
                      <p className="text-gray-500">
                        {userData.dial} {userData.phone}
                      </p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Email</span>
                      <p className="text-gray-500">{userData.email}</p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Date of birth</span>
                      <p className="text-gray-500">
                        {userData.birthday || "-"}
                      </p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Gender</span>
                      <p className="text-gray-500">{userData.gender || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-8/12">
                <div className="p-5 border-[1px] bg-white border-slate-200 shadow-sm rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">My addresses</h2>
                  <div className="space-y-4">
                    <div
                      className="flex items-center p-4 border rounded-lg cursor-pointer"
                      onClick={openHomeAddressModal}
                    >
                      <div className="h-12 w-12 bg-slate-200 rounded-full mr-3 flex justify-center items-center">
                        <TbHome className="size-6 text-slate-700" />
                      </div>
                      <div>
                        <h2 className="font-semibold">Home</h2>
                        <p className="text-gray-500">
                          {userData.home_address || "Add a home address"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center p-4 border rounded-lg cursor-pointer"
                      onClick={openWorkAddressModal}
                    >
                      <div className="h-12 w-12 bg-slate-200 rounded-full mr-3 flex justify-center items-center">
                        <MdOutlineBusinessCenter className="size-6 text-slate-700" />
                      </div>
                      <div>
                        <h2 className="font-semibold">Work</h2>
                        <p className="text-gray-500">
                          {userData.work_address || "Add a work address"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {showModal && <EditModal userData={userData} onClose={closeModal} />}
      {homeaddressmodal && <HomeAddress onClose={closeModal} />}
      {workaddressesModal && <WorkAddress onClose={closeModal} />}
    </>
  );
};

export default CustomerProfile;
