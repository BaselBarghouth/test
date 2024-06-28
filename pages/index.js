import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/news-letter";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
          <Hero />
      <NewsLetter />
      
      </>
  );
}
