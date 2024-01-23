import React from "react";
import { HiOutlineDeviceTablet } from "react-icons/hi2";
import { MdShowChart } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { TbLogout2 } from "react-icons/tb";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useTranslation } from "../../i18n";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
const SidebarPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const session = await auth();
  const { t } = await useTranslation(lng, "sidebar");
  return (
    <div className="flex flex-col items-center min-h-screen w-1/3 p-2 text-left border-x-2 sm:w-1/5">
      <h1 className="text-slate-600 text-xl font-bold mt-10 mb-16 ">ETTMS</h1>
      <div className="ml-4">
        <Link href="/Device_registration">
          <div className="mb-4 flex items-center text-start">
            <HiOutlineDeviceTablet className="text-xl" />
            <p className="text-slate-600 font-medium ml-1">
              {t("Device Registration")}
            </p>
          </div>
        </Link>
        <Link href="/Device_Scan">
          <div className="mb-4 flex items-center text-start">
            <TbDeviceDesktopSearch className="text-xl" />
            <p className="text-slate-600 font-medium ml-1">
              {t("Show Device Information")}
            </p>
          </div>
        </Link>
        <Link href="/Tracking_registration">
          <div className="mb-4 flex items-center text-start">
            <MdShowChart className="bg-slate-700 text-white text-l rounded " />
            <p className="text-slate-600  font-medium ml-1">
              {t("Tracking Registration")}
            </p>
          </div>
        </Link>
        <Link href="/Track_Scan">
          <div className="mb-4 flex items-center text-start">
            <TfiAgenda className="" />
            <p className="text-slate-600 font-medium ml-1">
              {t("Show Tracking information")}
            </p>
          </div>
        </Link>
        <Link href="/empty">
          <div className="mb-4 flex items-center text-start">
            <CgProfile className="text-l" />
            <p className="text-slate-600 font-medium ml-1">{t("Profile")}</p>
          </div>
        </Link>
        {session ? (
          <Link href="Logout">
            <div className="flex items-center text-start">
              <TbLogout2 className="text-l" />
              <p className="text-slate-600 font-medium ml-1">{t("Logout")}</p>
            </div>
          </Link>
        ) : (
          <Link href="Login">
            <div className="flex items-center text-start">
              <TbLogout2 className="text-l" />
              <p className="text-slate-600 font-medium ml-1">{t("Login")}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SidebarPage;
