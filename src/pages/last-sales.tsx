import { useEffect, useState } from "react";

import type { GetStaticPathsContext } from "next";

import useSWR from "swr";

import { Sale } from "@/types/sale";

export interface LastSalesPageProps {
  initialSales: Sale[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LastSalesPage({ initialSales }: LastSalesPageProps) {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-af505-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales: Sale[] = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-af505-default-rtdb.firebaseio.com/sales.json")
  //     .then((response: Response) => response.json())
  //     .then((data) => {
  //       const transformedSales: Sale[] = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map(({ id, username, volume }) => (
        <li key={id}>
          {username} - ${volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context: GetStaticPathsContext) {
  const response = await fetch(
    "https://nextjs-course-af505-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const transformedSales: Sale[] = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { initialSales: transformedSales } };
}
