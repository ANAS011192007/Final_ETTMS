"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineDeviceTablet } from "react-icons/hi2";
import { MdShowChart } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { TbLogout2 } from "react-icons/tb";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useTranslation } from "../../i18n/client";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SidebarPage = ({ params: { lng } }: { params: { lng: string } }) => {
  let session;
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  console.log(pathname);

  const fetchData = async () => {
    try {
      session = await auth();
      console.log(session);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      await fetchData();
    };

    fetchDataAndInitialize();
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen w-1/3 p-2 text-left border-x-2 sm:w-1/5">
      <h1 className="text-slate-600 text-xl font-bold mt-10 mb-16 ">ETTMS</h1>
      <div className="ml-4">
        <Link href="/Device_registration">
          <div className="mb-4 flex items-center text-start">
            <HiOutlineDeviceTablet className="text-xl" />
            <p
              className={`${
                pathname === `/${lng}/Device_registration` ||
                pathname === `/${lng}/Device_registration/form`
                  ? "font-bold"
                  : "font-medium"
              } text-slate-600 ml-1`}
            >
              {t!("Device Registration")}
            </p>
          </div>
        </Link>
        <Link href="/Device_Scan">
          <div className="mb-4 flex items-center text-start">
            <TbDeviceDesktopSearch className="text-xl" />
            <p
              className={`${
                pathname === `/${lng}/Device_Scan` ||
                pathname === `/${lng}/Show_Device_Information`
                  ? "font-bold"
                  : "font-medium"
              } text-slate-600 ml-1`}
            >
              {t!("Show Device Information")}
            </p>
          </div>
        </Link>
        <Link href="/Tracking_registration">
          <div className="mb-4 flex items-center text-start">
            <MdShowChart className="bg-slate-700 text-white text-l rounded " />
            <p
              className={`${
                pathname === `/${lng}/Tracking_registration` ||
                pathname === `/${lng}/Tracking_registration/form`
                  ? "font-bold"
                  : "font-medium"
              } text-slate-600 ml-1`}
            >
              {t!("Tracking Registration")}
            </p>
          </div>
        </Link>
        <Link href="/Track_Scan">
          <div className="mb-4 flex items-center text-start">
            <TfiAgenda className="" />
            <p
              className={`${
                pathname === `/${lng}/Track_Scan` ||
                pathname === `/${lng}/Show_Tracking_Information`
                  ? "font-bold"
                  : "font-medium"
              } text-slate-600 ml-1`}
            >
              {t!("Show Tracking information")}
            </p>
          </div>
        </Link>
        {/* <Link href="/empty">
          <div className="mb-4 flex items-center text-start">
            <CgProfile className="text-l" />
            <p className="text-slate-600 font-medium ml-1">{t!("Profile")}</p>
          </div>
        </Link> */}

        <Link href="Logout">
          <div className="flex items-center text-start">
            <TbLogout2 className="text-l" />
            <p className="text-slate-600 font-medium ml-1">{t!("Logout")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarPage;
