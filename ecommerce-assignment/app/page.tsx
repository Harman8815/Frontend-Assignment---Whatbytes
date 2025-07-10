import React from "react";
import { Suspense } from "react";
import Hero from "../components/Hero";
const page = () => {
  return (
    <div>
      {" "}
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
    </div>
  );
};

export default page;
