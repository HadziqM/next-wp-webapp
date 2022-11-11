interface Props {
  date: Date;
  name: string;
  url: string;
  comment: string;
}

export default function CommentCard(props: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <h2 className="mr-4">{props.name}</h2>
        <img
          src={props.url}
          alt={props.name}
          className="border-gold border h-4 w-4 rounded-full"
        />
        <p className="ml-8">{new Date(props.date).toString()}</p>
      </div>
      <p>{props.comment}</p>
    </div>
  );
}
