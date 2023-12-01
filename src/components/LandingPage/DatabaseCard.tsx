import React from "react";

const DatabaseCard = ({ label, backgroundImage }: { label: string; backgroundImage: string }) => {
  return (
    <div
      className="relative m-4" // Added relative positioning here
      style={{
        height: "375px",
        // Gradient fades to the parent component's background color
        backgroundImage: `linear-gradient(rgba(99, 114, 104, 0), rgba(99, 114, 104, 1)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-3xl font-extrabold text-white">{label}</h1>
    </div>
  );
};

export default DatabaseCard;
