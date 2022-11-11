interface Props {
  children: React.ReactNode;
}
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>
        <article className="my-2 p-0">{children}</article>
      </main>
      <Footer />
    </>
  );
}
