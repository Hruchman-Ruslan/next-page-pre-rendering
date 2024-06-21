import type { GetServerSidePropsContext } from "next";

export interface UserProfilePageProps {
  username: string;
}

export default function UserProfilePage({ username }: UserProfilePageProps) {
  return <h1>{username}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  console.log(req);
  console.log(res);

  return {
    props: {
      username: "Ruslan",
    },
  };
}
