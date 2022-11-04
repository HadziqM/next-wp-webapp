import Image from "next/image";
interface Card {
  link: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: {
    name: string;
  }[];
}

export default function PostCard({
  link,
  title,
  description,
  author,
  date,
  category,
}: Card) {
  const clean = description.match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/);
  if (clean == null) return <></>;
  return (
    <div className="flex flex-col py-4 px-2 justify-between shadow-black shadow-lg rounded-lg text-center w-[400px] h-[400px] items-center">
      <div className="flex w-[300px] h-[180px]">
        <img
          src={link}
          alt="post featured image"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: clean[0] }} className="px-4" />
      <div className="flex justify-start">
        <p className="mr-4">Posted by: {author}</p>
        <p>
          On: {String(new Date(date)).replace("GMT+0700 (Indochina Time)", "")}
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-[0.7rem] font-bold mr-1">Category:</p>
        {category.map((e) => (
          <p className="text-gold text-[0.65rem] mr-1">{e.name}</p>
        ))}
      </div>
    </div>
  );
}
