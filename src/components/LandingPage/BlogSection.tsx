import React from "react";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  return (
    <>
      <div
        className="p-8 text-white"
        style={{
          backgroundColor: "rgb(49, 72, 63)",
        }}
      >
        <h2 className="border-rose-400 m-3 inline-block border-b-4 pb-2 text-3xl font-bold">Blog</h2>
        <div
          className="grid grid-cols-3 gap-4 p-8 text-white"
          style={{
            backgroundColor: "rgb(49, 72, 63)",
          }}
        >
          <div>
            <BlogCard label={"Miami Researchers"} backgroundImage={"/assets/Quartz.jpg"} />
          </div>
          <div>
            <BlogCard label={"Australia Designers 3D prints artificial reefs"} backgroundImage={"/assets/3d_printed_reef.png"} />
          </div>
          <div>
            <BlogCard label={"Japan Story"} backgroundImage={"/assets/stonecycling-bespoke-wastebasedbricks-colours-4-1768x1457.jpg"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
