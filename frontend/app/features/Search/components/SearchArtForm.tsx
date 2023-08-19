import { Dispatch, FC, SetStateAction, useState } from "react";

interface SearchArtFormProps {
  setInputValue: Dispatch<SetStateAction<string>>;
  onClick(): Promise<void>;
}

export const SearchArtForm: FC<SearchArtFormProps> = ({
  setInputValue,
  onClick,
}) => {
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6 mb-2 md:grid-cols-2">
          <label
            htmlFor="keyword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search art data by keyword
          </label>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="mb-6">
            <input
              type="text"
              id="keyword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bansky"
              value={searchValue}
              onChange={handleInputTextChange}
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={onClick}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchArtForm;
