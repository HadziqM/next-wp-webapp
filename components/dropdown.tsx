import { type } from "os";
import { useState } from "react";

interface Props {
  elementClick: (title: string) => void;
  elements: string;
}
interface Idk {
  prop: Props[];
}

function Items(prop: Props) {
  return (
    <li>
      <p
        onClick={(e) => {
          e.preventDefault();
          prop.elementClick(prop.elements);
        }}
        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {prop.elements}
      </p>
    </li>
  );
}

export default function Dropdown({ prop }: Idk) {
  const [display, setDisplay] = useState("none");
  const [name, setName] = useState(prop[0].elements);
  return (
    <div className="relative flex flex-col">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          display === "none" ? setDisplay("block") : setDisplay("none");
        }}
      >
        {name}{" "}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="bottom"
        style={{
          position: "absolute",
          inset: "0px auto auto 0px",
          margin: "0px",
          transform: "translate(-3px, 50px)",
          display: display,
        }}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
          onClick={(e) => {
            e.preventDefault();
            display === "none" ? setDisplay("block") : setDisplay("none");
          }}
        >
          {prop.map((e) => (
            <Items
              key={e.elements}
              elementClick={() => {
                setName(e.elements);
                e.elementClick(e.elements);
              }}
              elements={e.elements}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
