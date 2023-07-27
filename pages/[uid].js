import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "../prismicio";
import { components } from "../slices";
import Layout from "@/components/Layout";
import LastUpdate from "@/components/LastUpdate";
import { useRouter } from "next/router";
import Greetings from "@/components/Greetings";

export default function Page({
  navigation,
  menus,
  page,
  lastUpdate,
  preloader,
  footer,
  metaTitle,
  metaDescription,
}) {
  let router = useRouter();

  return (
    <Layout navigation={navigation}>
      <>
        <Head>
          <title>Title</title>
          <meta name="title" content="Title" />
          <meta name="description" content="Title" />
          {/* <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" /> */}
        </Head>
        {/* <Greetings /> */}
        <SliceZone slices={page.data.slices} components={components} />

        {/* {router.query.uid === "about" && <LastUpdate date={lastUpdate} />} */}
        {/* <Footer footer={footer.data} /> */}
      </>
    </Layout>
  );
}

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", {
    fetchLinks:
      "social_media.name, social_media.link, contacts.name, contacts.link",
  });
  const page = await client.getByUID("page", params.uid, {
    fetchLinks:
      "contacts.name, contacts.link, social_media.name, social_media.link, project.project_name, project.project_year, project.project_description, project.project_url, project.project_image",
  });

  return {
    props: {
      navigation,
      page,
      lastUpdate: page.last_publication_date,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismic.asLink(page)),
    fallback: false,
  };
}
