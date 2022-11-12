import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  date: Date;
  name: string;
  url: string;
  comment: string;
}

export default function CommentCard(props: Props) {
  return (
    <div className="flex m-4">
      <img
        src={props.url}
        alt={props.name}
        className="border-black border h-16 w-16 rounded-md"
      />
      <div className="flex flex-col ml-2">
        <div className="flex items-center">
          <h2 className="mr-2 font-bold flex items-center">{props.name}</h2>
          <p className="ml-4 text-[0.5rem]">
            {dayjs(new Date(props.date)).fromNow()}
          </p>
        </div>
        <p className="border border-black rounded-md bg-white p-2">
          {props.comment}
        </p>
      </div>
    </div>
  );
}
