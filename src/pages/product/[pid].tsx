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
  if (!loadedProduct) {
    return <p>Loading...</p>; // fallback: true,
  }

  const { title, description } = loadedProduct;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid as string;

  const data = await getData();

  const product = data.products.find(
    (product: IProducts) => product.id === productId
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product: IProducts) => product.id);

  const pathWithParams = ids.map((id: string) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    fallback: true,
    // fallback: false,
    // fallback: "blocking",
  };
}
