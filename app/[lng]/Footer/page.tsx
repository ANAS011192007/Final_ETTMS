"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { MdRefresh } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
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
