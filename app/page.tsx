"use client";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import VideoGrid from "@/_components/videoGrid";
import Link from "next/link";

export default function Home() {
  type Item = {
    _id: string;
    projectName: string;
    urlList: {
      url: string;
      time: string;
      _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  const [data, setData] = useState<Item[] | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tous");

  const handleFilter = (name: string) => {
    setActiveFilter(name);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAll`)
      .then((res) => res.json())
      .then((data) => setData(data.items))
      .catch((err) => console.error("Erreur lors du fetch :", err));
  }, []);

  const filter = data ? [...new Set(data.map((item) => item.projectName))] : [];

  return (
    <main>
      <div className="flex min-h-screen min-w-screen flex-col pt-[20px] gap-8 cote">
        <header className="flex w-full justify-between">
          <div className="h-[40px] w-[120px]">
            <Link href="/421">
              <Image
                src="/header.png"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </Link>
          </div>
          <UserButton />
        </header>

        <div className="flex gap-3 overflow-scroll">
          {["Tous", ...filter].map((name) => (
            <button
              key={name}
              onClick={() => handleFilter(name)}
              className={`py-1 px-3 rounded-full text-sm whitespace-nowrap ${
                activeFilter === name
                  ? "bg-white text-black"
                  : "bg-[#272727] text-white"
              } hover:bg-gray-500`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="w-full h-full">
          {data ? (
            <VideoGrid activeFilter={activeFilter} />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
