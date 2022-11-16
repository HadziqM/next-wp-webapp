import Image, { StaticImageData } from "next/image";
import Router from "next/router";

interface Idk {
  max: number;
  min: number;
  image: string | StaticImageData;
  title: string;
  slug: string;
}

export default function Donate(anjir: Idk) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });
  const percentage = Math.floor((anjir.min / anjir.max) * 100);
  return (
    <div className="flex flex-col justify-center items-center w-[512px] h-[469px] bg-[rgba(0,0,0,0.9)] py-1 relative rounded-lg">
      <div className="flex w-[487px] h-[272px] relative">
        <Image
          src={anjir.image}
          alt="donasi untuk masjid"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2 className="font-bold text-[1.2rem] text-white">{anjir.title}</h2>
      <p className="font-[0.5rem] text-gold mr-auto ml-[8px]">TERKUMPUL</p>
      <div className="flex h-[2px] w-[487px] justify-start items-center bg-white">
        <div
          className="flex bg-gold h-[2px]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between w-full px-[8px]">
        <p className="font-[0.5rem] text-gold">{formatter.format(anjir.min)}</p>
        <p className="font-[0.5rem] text-gold">{formatter.format(anjir.max)}</p>
      </div>
      <button
        className="bg-gold text-center rounded-[43px] w-[244px] h-[43px] font-bold"
        onClick={(e) => Router.push(`/infaq/${anjir.slug}`)}
      >
        DONASI SEKARANG
      </button>
    </div>
  );
}
