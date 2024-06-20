import { Fragment } from "react";
import { GetStaticPropsContext } from "next";

import { readFile } from "fs/promises";

import path from "path";

export interface ProductDetailPageProps {}

export default function ProductDetailPage({
  loadedProduct,
}: ProductDetailPageProps) {
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

  const productId = params.pid as string;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}
