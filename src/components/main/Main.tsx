import React, { FC } from "react";
import TypingAnimation from "../magicui/typing-animation.tsx";

import IconCloud from "../Cloud/Cloud";
import ParticlesDemo from "../magicui/particlesDemo.tsx";

const Main: FC = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center relative flex-col">
      <div className="flex justify-center items-center  w-[100%] h-[70vh]">
        <div>
          <p className="text-xl m-2 mb-5">Hey &#128075; I'm </p>
          <TypingAnimation
            className=" lg:text-8xl  text-5xl font-bold "
            text="DHANANJAY "
          />
          <p className="text-xl m-2 mt-5 float-end">Full Stack Web Developer</p>
        </div>
      </div>

      <ParticlesDemo />
      <div className="flex flex-col w-[100%] pb-10 h-[500px] md:h-auto md:flex-row justify-evenly items-center">
        <p className="w-80 h-auto text-center rounded-xl bg-white/10 backdrop-blur-md p-8 text-xs md:text-sm">
          Highly skilled at building REST APIs with a strong focus on backend
          development using Node.js.{" "}
        </p>
        <p className="w-80 h-auto text-center bg-white/10 backdrop-blur-md p-8 text-xs md:text-sm rounded-xl">
        Proficient in building scalable, secure APIs, integrating databases, and implementing authentication with Node.js.
        </p>
      </div>
    </div>
  );
};

export default Main;
