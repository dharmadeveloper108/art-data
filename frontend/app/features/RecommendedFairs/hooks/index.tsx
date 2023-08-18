import { get } from "@/app/api/fetch";
import { BASE_URL, ENV } from "@/app/config";
import { Fair } from "@/app/types/fair";
import { Maybe } from "@/app/types/maybe";
import { useEffect, useState } from "react";

const staticRecommendedFairs: Fair[] = [
  {
    artsyId: "6447bd4e433844000e819195",
    title: "viennacontemporary 2023",
    description: "Really cool show",
    artsyLink: "https://api.artsy.net/api/fairs/6447bd4e433844000e819195",
  },
  {
    artsyId: "648ae628ba30cd000d51ef11",
    title: "Galleries Association of Korea",
    description:
      "Founded in 1976, Galleries Association of Korea is an esteemed association composed of approximately 170 leading galleries based in Korea.",
    artsyLink: "https://api.artsy.net/api/fairs/648ae628ba30cd000d51ef11",
  },
  {
    artsyId: "6447bd4e433844000e81919777",
    title: "Some cool show",
    description: "Really cool show",
    artsyLink: "https://api.artsy.net/api/fairs/6447bd4e433844000e819195",
  },
]; // this is just to always have something show up in debug

export const useGetRecommendedFairs = (token: string) => {
  const [data, setData] = useState<Maybe<Fair[]>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const isProduction: boolean = ENV === "production";

    const fetchWithToken = async () => {
      try {
        setLoading(true);
        const res = await get(`${BASE_URL}/api/fairs/`, token);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const responseData = await res.json();
        setData(responseData);
      } catch (error) {
        setError(error as Error);
        if (!isProduction) {
          setData(staticRecommendedFairs);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWithToken();
  }, [token]);

  return [{ data, error, loading }];
};
