"use client";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Button } from "@/components/ui/button";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { LiaLessThanSolid } from "react-icons/lia";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCaretDown } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  const changeItemsPerPage = (count: number) => {
    setItemsPerPage(count);
  };
  const [itemsPerPage, setItemsPerPage] = React.useState(10); // Default items per page

  const itemsPerPageOptions = Array.from(
    { length: 20 },
    (_, index) => index + 1
  );
  return (
    <div className="flex text-sm text-slate-500 font-semibold">
      <div className="flex items-center">
        <div className="mr-2">Rows Per Page </div>
        <div className="mr-1"></div>
        {/* <Button
          className="text-sm border-none text-slate-400 gap-1"
          variant="outline"
          size="icon"
          onClick={() => changePage(currentPage - 1)}
        >
          {itemCount}
          <FaCaretDown className="" />
          <select
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => changeItemsPerPage(Number(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Button> */}
        <Select>
          <SelectTrigger value={10} className="w-16 border-none">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              {/* <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>1-1 of {pageCount}</div>
        <Button
          className="text-xs border-none text-slate-400"
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <LiaLessThanSolid />
        </Button>

        <Button
          className="text-xs border-none text-slate-400"
          variant="outline"
          size="icon"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <LiaGreaterThanSolid />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
