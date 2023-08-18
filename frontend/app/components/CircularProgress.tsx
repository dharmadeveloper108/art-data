export const CircularProgress = () => (
  <div className={"flex justify-center items-center"}>
    <div className="animate-spin inline-block relative w-10 h-10">
      <div className="box-border block absolute w-8 h-8 m-1 border-4 border-solid border-x-gray-500 border-t-gray-500 border-b-gray-100 border-white rounded-full"></div>
    </div>
  </div>
);
