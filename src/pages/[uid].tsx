import type { GetServerSidePropsContext } from "next";

export interface UserIdPageProps {
  id: string;
}

export default function UserIdPage({ id }: UserIdPageProps) {
  return <h1>{id}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const userID = params?.uid;

  return {
    props: {
      id: "userId-" + userID,
    },
  };
}
