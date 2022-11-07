import type { NextPage } from "next";
import React from "react";

const Upload: NextPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const inputTitleRef = React.useRef<HTMLInputElement | null>(null);
  const inputDescRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    /* Prevent form from submitting by default */
    e.preventDefault();

    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }
    if (!inputTitleRef.current?.value) {
      alert("Please, add title");
      return;
    }
    if (!inputDescRef.current?.value) {
      alert("Please, add desc");
      return;
    }
    if (!inputFileRef.current?.files[0]?.name.endsWith(".md")) {
      alert("Please, only upload Markdown file");
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });
    formData.append("title", inputTitleRef.current.value);

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      message: string;
    };

    alert(body.message);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form>
      <div>
        <input
          type="text"
          name="title"
          required
          className="border-black border"
          ref={inputTitleRef}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          required
          className="border-black border"
          ref={inputDescRef}
        />
      </div>
      <div>
        <input type="file" name="myfile" ref={inputFileRef} />
      </div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          onClick={handleOnClick}
          className="border border-black cursor-pointer bg-[#ddd] p-1"
        />
        {isLoading && ` Wait, please...`}
      </div>
    </form>
  );
};

export default Upload;
