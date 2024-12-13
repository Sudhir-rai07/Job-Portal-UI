import { useState } from "react";
import { Input } from "react-daisyui";
import { Search, X } from "lucide-react";
import apiClient from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate()

  const fetchJobs = async () => {
    const response = await apiClient.get(`/api/job/latest-jobs?filter=${query}`);
    return response.data;
  };
  const { data: allJobs, refetch } = useQuery({
    queryKey: ["AllJobs"],
    queryFn: () => fetchJobs(),
  });

  console.log(allJobs);

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/?filter=${query}`);
    refetch();
  };
  const handleClearQuery = () => {
    setQuery("");
    navigate("/")
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-4 mt-8 bg-white rounded-full shadow-black"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search here {job roles, places etc...}"
        className="w-full placeholder:px-4 focus:outline-none border-none bg-transparent placeholder:font-semibold md:min-w-[600px] min-w-[250px] md:h-18 h-16 "
      />
      {query && (
        <X
          size={28}
          onClick={handleClearQuery}
          className="mr-2 cursor-pointer"
        />
      )}
      <Button type="submit" className="text-black bg-transparent border-none shadow-none hover:bg-transparent">
        <Search type="submit" size={28} className="cursor-pointer" />
      </Button>
    </form>
  );
};

export default SearchForm;
