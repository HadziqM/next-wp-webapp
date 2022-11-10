import Router from "next/router";
import Image from "next/image";

interface Props {
  img: string;
  slug: string;
  title: string;
}

export default function Jadwal({ img, slug, title }: Props) {
  const onClicked = function () {
    Router.push(`/post/${slug}`);
  };
  return (
    <div className="flex flex-col cursor-pointer gap-2" onClick={onClicked}>
      <div className="flex p-1 border-black border-b justify-start">
        <p className=" text-[0.5rem]">{title}</p>
      </div>
      <Image src={img} alt={title} width={180} height={130} />
    </div>
  );
}
