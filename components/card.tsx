import Router from "next/router";
import Image from "next/image";

interface Sorted {
  img: string;
  title: string;
  date: string;
  tags: string;
  slug: string;
}

export default function Cards({ img, title, date, tags, slug }: Sorted) {
  const onClicked = function () {
    Router.push(`/post/${slug}`);
  };
  return (
    <div
      className=" flex flex-start p-2 items-center gap-2 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] w-full"
      onClick={onClicked}
    >
      <Image src={img} alt={title} width={161} height={90} />
      <div
        className="flex flex-col justify-between py-1"
        style={{ height: "90px" }}
      >
        <h2 className="text-black text-2xl font-normal">{title}</h2>
        <div className="flex gap-1 flex-start">
          <p className="text-gold uppercase mr-4">{tags}</p>
          <p className="uppercase font-light">
            {String(new Date(date)).replace("GMT+0700 (Indochina Time)", "")}
          </p>
        </div>
      </div>
    </div>
  );
}
