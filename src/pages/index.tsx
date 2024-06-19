import { IProducts } from "@/types/products";

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
  return {
    props: {
      products: [{ id: "1", title: "Product 1" }],
    },
  };
}
