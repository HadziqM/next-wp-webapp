import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";
import { testingPost } from "../../lib/wp";
import { promises as fs } from "fs";
import path from "path";
import { Views } from "../../type";
import Head from "next/head";

interface query {
  slug: string;
}
interface input {
  query: query;
}

export async function getServerSideProps(context: input) {
  const { slug } = context.query;
  const res = await testingPost(slug);
  const fileDir = path.join(process.cwd(), `/wp-post-view/`);
  const data = String(await fs.readFile(fileDir + "view.json"));
  let json: Views = JSON.parse(data);
  const result = json.views.filter((e) => e.slug == slug);
  if (result.length === 1) {
    const views = result[0].view + 1;
    const updated = json.views.map((e) => {
      if (e.slug == slug) {
        e.view = views;
        return e;
      }
      return e;
    });
    const json_data = JSON.stringify({ views: updated }, null, 2);
    await fs.writeFile(fileDir + "view.json", json_data);
  } else if (result.length === 0) {
    const updated = {
      slug: String(slug),
      view: 1,
    };
    json.views.push(updated);
    const json_data = JSON.stringify(json, null, 2);
    await fs.writeFile(fileDir + "view.json", json_data);
  }
  return { props: { res } };
}

export default function Wordpress({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{res.title} - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content={res.title} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <h1 className="text-center font-bold text-[2rem] mt-2">{res.title}</h1>
        <div
          className="wordpress"
          dangerouslySetInnerHTML={{ __html: res.content }}
        />
      </Layout>
    </>
  );
}
