import { Maybe } from "@/app/types/maybe";
import { Fair } from "../app/types/fair";
import { RecommendedFairs } from "@/app/features/RecommendedFairs/RecommendedFairs";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="mb-16">
        <a href={"/search"} style={{ textDecoration: "underline" }}>
          Find all the art info you need!
        </a>
      </div>

      <RecommendedFairs />
    </main>
  );
};

export default Home;
