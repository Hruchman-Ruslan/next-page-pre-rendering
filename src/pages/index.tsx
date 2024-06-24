import Link from "next/link";

import { readFile } from "fs/promises";

import path from "path";

import { IProducts } from "@/types/products";

export interface HomeProps {
  products: IProducts[];
}

export default function Home({ products }: HomeProps) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/product/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
