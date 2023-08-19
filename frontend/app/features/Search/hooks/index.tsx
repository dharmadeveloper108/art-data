import { post } from "@/app/api/fetch";
import { useAuth } from "@/app/auth/AuthContext";
import { BASE_URL } from "@/app/config";
import { Maybe } from "@/app/types/maybe";
import { SearchResult } from "@/app/types/search-result";
import { useState, useCallback } from "react";

export const useFindSearchResults = (
  keywords: string
): {
  loading: boolean;
  error: Maybe<Error>;
  responseData: Maybe<SearchResult>;
  handleSearch: (keywords: string) => Promise<void>;
} => {
  const [responseData, setResponseData] = useState<Maybe<SearchResult>>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Maybe<Error>>(null);

  const { getBearerToken } = useAuth();
  const token = getBearerToken();

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);      

      const response = await post(`${BASE_URL}/api/search`, token, {
        query: keywords,
      });
      
      const searchResult: SearchResult = await response.json();

      setResponseData(searchResult);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [keywords, token]);

  return { responseData, loading, error, handleSearch };
};
