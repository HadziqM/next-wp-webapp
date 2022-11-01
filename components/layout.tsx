import Header from "./header";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <article className="m-0 p-0">{children}</article>
      <Footer />
    </>
  );
}
