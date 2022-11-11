interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <main>
        <article className="my-2 p-0">{children}</article>
      </main>
    </>
  );
}
