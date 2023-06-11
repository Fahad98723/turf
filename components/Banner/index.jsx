import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const HeaderDescription = dynamic(
  () => {
    return import("./HeaderDescription");
  },
  { ssr: false }
);

export default function Banner() {
  return (
    <div>
      <section className=" min-h-[300px]">
        <div className="rounded-xl ">
          <div className="relative">
            <div className="hidden lg:block h-full  w-full rounded-xl">
              <img
                src={
                  "https://www.diabetes.co.uk/wp-content/uploads/2018/12/the-ball-stadion-football-the-pitch-46798.jpeg"
                }
                className="h-full w-full "
                alt=""
              />
            </div>
            <div className="lg:hidden block h-full w-full  rounded-xl">
              <img
                src={
                  "https://www.diabetes.co.uk/wp-content/uploads/2018/12/the-ball-stadion-football-the-pitch-46798.jpeg"
                }
                className="h-full w-full  "
                alt=""
              />
            </div>
            <HeaderDescription />
          </div>
        </div>
      </section>
    </div>
  );
}
