import { useEffect, useState } from "react";

import { Sale } from "@/types/sale";

export interface LastSalesPageProps {}

export default function LastSalesPage({}: LastSalesPageProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-af505-default-rtdb.firebaseio.com/sales.json")
      .then((response: Response) => response.json())
      .then((data) => {
        const transformedSales: Sale[] = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
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
