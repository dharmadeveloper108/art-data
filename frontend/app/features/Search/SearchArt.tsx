import { CircularProgress } from "@/app/components/CircularProgress";
import { SearchResultComponent } from "./components/SearchArtResultsComponent";
import { useFindSearchResults } from "./hooks";
import { useState } from "react";
import { ENV } from "@/app/config";
import SearchArtForm from "./components/SearchArtForm";

export const SearchArt = () => {
  const isProduction: boolean = ENV === "production";
  const [searchValue, setSearchValue] = useState<string>("");

  const { responseData, loading, error, handleSearch } =
    useFindSearchResults(searchValue);
  return (
    <>
      <SearchArtForm
        setInputValue={setSearchValue}
        onClick={async () => await handleSearch(searchValue)}
      />
      {loading && <CircularProgress />}
      {error && !isProduction && <CircularProgress />}
      {responseData && <SearchResultComponent {...responseData} />}
    </>
  );
};
