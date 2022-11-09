import React from "react";
import Image, { StaticImageData } from "next/image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Router from "next/router";
interface Props {
  children: React.ReactNode;
  width: number;
  height: number;
  interval?: number;
}
interface Idk {
  children: React.ReactNode;
  lebar: number;
  height: number;
  slug?: string;
  url: string | StaticImageData;
  alt?: string;
}

export function CorouselItem({ children, lebar, height, url, alt, slug }: Idk) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault;
        slug && Router.push(slug);
      }}
      className="inline-flex relative cursor-pointer"
      style={{ height: height, width: lebar }}
    >
      <Image src={url} alt={alt ?? ""} objectFit="cover" layout="fill" />
      <div className="absolute bottom-0 bg-gold opacity-[0.90] w-full text-white">
        {children}
      </div>
    </div>
  );
}
export default function Corousel({ children, width, height, interval }: Props) {
  const [slide, setSlide] = React.useState(0);
  const childLength = React.Children.count(children);
  const updateIndex = (index: number) => {
    if (index < 0) return setSlide(childLength - 1);
    if (index >= childLength) return setSlide(0);
    setSlide(index);
  };
  if (interval) {
    React.useEffect(() => {
      const myInterval = setInterval(() => {
        updateIndex(slide + 1);
      }, interval);
      return () => {
        clearInterval(myInterval);
      };
    }, [slide]);
  }
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: width, height: height }}
    >
      <div
        onClick={(e) => {
          e.preventDefault;
          updateIndex(slide + 1);
        }}
        className="absolute z-50 h-full flex items-center cursor-pointer hover:bg-[rgba(0,0,0,0.1)]"
        style={{ left: width - 20 }}
      >
        <AiFillCaretRight />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault;
          updateIndex(slide - 1);
        }}
        className="absolute left-0 z-50 h-full flex items-center cursor-pointer hover:bg-[rgba(0,0,0,0.1)]"
      >
        <AiFillCaretLeft />
      </div>
      <div
        className="whitespace-nowrap transition-transform"
        style={{ transform: `translateX(${-slide * 100}%)` }}
      >
        {React.Children.map(children, (c: any, i) =>
          React.cloneElement(c, { width: "100%" })
        )}
      </div>
    </div>
  );
}
