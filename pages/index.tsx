import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { SearchResults } from "@/components/SearchResults";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <SearchResults results={results} />
    </div>
  );
}
