import { Card } from "@/app/components/Card";
import { Fair } from "@/app/types/fair";
import { FC } from "react";
import { ErrorAlert } from "@/app/components/ErrorAlert";
import { BASE_URL, ENV } from "@/app/config";
import { GetServerSideProps } from "next";
import { staticRecommendedFairs } from "./static-art-fairs";
import { get } from "@/app/api/fetch";
import { Maybe } from "@/app/types/maybe";

interface RecommendedFairsProps {
  data: Maybe<Fair[]>;
}

export const RecommendedFairs: FC<RecommendedFairsProps> = ({ data }) => {
  const isProduction: boolean = ENV === "production";

  return (
    <>
      <div className="w-max mb-6">
        <h2>Recommended Art Fairs</h2>
      </div>
      {!data && !isProduction && (
        <div className="w-80 mb-6">
          <ErrorAlert error={"Error fetching data"} details={":("} />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map((item: Fair) => (
            <Card key={item.artsyId} link={item.artsyLink} {...item} />
          ))}
      </div>
    </>
  );
};
