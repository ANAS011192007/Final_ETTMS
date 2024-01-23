"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "../../i18n/client";

const FooterPage = ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = useTranslation(lng, "navbar");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <footer className="w-full bg-slate-100 border-b p-4 text-center fixed bottom-0 text-slate-500 font-semibold">
      <p>©2023 Ultra-X Asia Pacific Inc. All rights reserved.</p>
    </footer>
  );
};

export default FooterPage;
