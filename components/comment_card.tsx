interface Props {
  date: Date;
  name: string;
  url: string;
  comment: string;
}

export default function CommentCard(props: Props) {
  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex items-center">
        <img
          src={props.url}
          alt={props.name}
          className="border-gold border h-8 w-8 rounded-full"
        />
        <h2 className="mr-2 font-bold">{props.name}</h2>
        <p className="ml-4">{new Date(props.date).toString()}</p>
      </div>
      <p>{props.comment}</p>
    </div>
  );
}
