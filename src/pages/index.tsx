import { readFile } from "fs/promises";

import { IProducts } from "@/types/products";

import path from "path";

export interface HomeProps {
  products: IProducts[];
}

export default function Home({ products }: HomeProps) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products,
    },
  };
}
