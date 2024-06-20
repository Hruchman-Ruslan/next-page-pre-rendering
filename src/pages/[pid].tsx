import { Fragment } from "react";

import { readFile } from "fs/promises";

import type { GetStaticPropsContext } from "next";

import path from "path";

import { IProducts } from "@/types/products";

export interface ProductDetailPageProps {
  loadedProduct: IProducts;
}

export default function ProductDetailPage({
  loadedProduct,
}: ProductDetailPageProps) {
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;   // fallback: true,
  // }

  const { title, description } = loadedProduct;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid as string;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find(
    (product: IProducts) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }],
    // fallback: false
    // fallback: true,
    fallback: "blocking",
  };
}
