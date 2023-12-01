import React from "react";
import BlogCard from "./blogCard";

const BlogSection = () => {
  return (
    <>
      <div
        className="p-8 text-white"
        style={{
          backgroundColor: "rgb(49, 72, 63)",
        }}
      >
        <h2 className="m-3 text-3xl font-bold border-b-4 border-rose-400 pb-2 inline-block">
          Blog
        </h2>
        <div
          className="p-8 text-white grid grid-cols-3 gap-4"
          style={{
            backgroundColor: "rgb(49, 72, 63)",
          }}
        >
          <div>
            <BlogCard
              label={"Miami Researchers"}
              backgroundImage={"/assets/Quartz.jpg"}
            />
          </div>
          <div>
            <BlogCard
              label={"Australia Designers 3D prints artificial reefs"}
              backgroundImage={
                "/assets/3d_printed_reef.png"
              }
            />
          </div>
          <div>
            <BlogCard
              label={"Japan Story"}
              backgroundImage={
                "/assets/stonecycling-bespoke-wastebasedbricks-colours-4-1768x1457.jpg"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
