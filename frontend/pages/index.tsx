import { get } from "@/app/api/fetch";
import { BASE_URL, ENV } from "@/app/config";
import { RecommendedFairs } from "@/app/features/RecommendedFairs/RecommendedFairs";
import { staticRecommendedFairs } from "@/app/features/RecommendedFairs/static-art-fairs";
import { Fair } from "@/app/types/fair";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const isProduction: boolean = ENV === "production";
  const token = process.env.BEARER_TOKEN!;

  const res = await get(`${BASE_URL}/api/fairs`, token);

  if (!isProduction && (!res || !res.ok)) {
    return {
      props: {
        data: staticRecommendedFairs,
      },
    };
  }
  const recommendedFairs: Fair[] = await res.json();

  return {
    props: {
      data: recommendedFairs,
    },
  };
};

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="mb-16">
        <a href={"/search"} style={{ textDecoration: "underline" }}>
          Find all the art info you need!
        </a>
      </div>
      <RecommendedFairs data={data} />
    </main>
  );
};

export default Home;
