import React from "react";
import IconCloud from "../Cloud/Cloud";
import { IconCloudDemo } from "../magicui/IconGlobe";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { FaDocker } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaSass } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { FaGitSquare } from "react-icons/fa";

const About: React.FC = () => {
  const style={
    width:"40px",
    height:"40px",
    margin:"5px",
    
  }
  return (
    <>
      <div className="w-[100%] h-[100vh] justify-center items-center flex flex-col md:flex-row">
        <div className="">
          <IconCloudDemo />
        </div>
        <div className="w-[80%] md:w-[50%] flex flex-col">
          <p className="text-xl mb-4 w-[100%] text-center">About Me</p>
          <p className="w-[100%]">
            I am a passionate Full Stack Developer with a background Bsc. in Computer
            Science and a strong desire to learn and grow. I am always eager to
            learn new technologies and develop my skills. My programming skills
            include{" "}
            <span className="text-red-500">
              {" "}
              JavaScript, TypeScript, React, Node.js
            </span>{" "}
            . I am currently based in{" "}
            <span className="text-red-500">Pune </span>, India.
          </p>
          <p className="mt-4 text-center mb-4 text-xl">Dev Tools</p>
          <div className="w-[100%] h-52 md:h-auto flex justify-around flex-wrap">
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <IoLogoJavascript style={style} />
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <SiTypescript style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <SiMongodb style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <FaNodeJs style={style} />
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <FaReact style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <FaDocker style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <RiTailwindCssFill style={style} />
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <FaSass style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md">
            <SiPostman style={style}/>
            </div>
            <div className="w-14 h-14  rounded-lg flex justify-center items-center bg-white/10 backdrop-blur-md flex-wrap"> 
            <FaGitSquare style={style}/>
            </div>
            
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default About;
