import React from "react";

const BlogCard = ({ label, backgroundImage }: { label: string; backgroundImage: string }) => {
  return (
    <div className="m-4">
      <div
        className="relative"
        style={{
          height: "375px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Background block for label */}
      <div className="flex items-center justify-center rounded bg-opacity-80 px-3 py-1" style={{ backgroundColor: "rgb(120,123,117)", height: "85px" }}>
        <h1 className="text-emerald-300 text-center text-2xl font-normal">{label}</h1>
      </div>
    </div>
  );
};

export default BlogCard;
