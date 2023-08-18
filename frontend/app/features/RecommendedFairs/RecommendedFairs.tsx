import { Card } from "@/app/components/Card";
import { Fair } from "@/app/types/fair";
import { FC, useEffect, useState } from "react";
import { useGetRecommendedFairs } from "./hooks";
import { useAuth } from "@/app/auth/AuthContext";
import { CircularProgress } from "@/app/components/CircularProgress";

export const RecommendedFairs: FC = () => {
  const [token, setToken] = useState<string>("");
  const { getBearerToken } = useAuth();

  useEffect(() => {
    const token = getBearerToken();
    setToken(token);
  }, [getBearerToken]);

  const [{ data, error, loading }] = useGetRecommendedFairs(token);

  return (
    <>
      <div className="w-max mb-6">
        <h2>Recommended Art Fairs</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.map((item: Fair) => (
            <Card key={item.artsyId} link={item.artsyLink} {...item} />
          ))}
        {loading && <CircularProgress />}
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
};
