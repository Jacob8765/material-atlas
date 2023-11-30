import { useState } from "react";

interface SearchBarProps {
  setSearchQuery: (inputVal: string) => void;
}

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  const [inputVal, setInputVal] = useState<string>("");

  return (
    <div className="w-100 bg-ivory rounded-lg p-2">
      <div className="flex items-center justify-between">
        <input
          className="bg-ivory flex-grow p-1 font-mono placeholder-black focus:outline-none"
          placeholder="search"
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
        <button onClick={() => setSearchQuery(inputVal)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
