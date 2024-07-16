"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from './particles';

const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    setColor(theme === "dark" ? "#FFFFFF" : "#FFFFFF");
  }, [theme]);

  return (
    <div className="absolute  flex h-[100%] w-[100%] flex-col items-center justify-center overflow-hidden rounded-lg -z-10 bg-background ">
      
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default ParticlesDemo;
