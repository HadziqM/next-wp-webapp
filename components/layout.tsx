import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <article className="my-2 p-0">{children}</article>
      <Footer />
    </>
  );
}
