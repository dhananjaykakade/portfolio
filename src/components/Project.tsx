import React from 'react'
import Card from './project/Card'
import image1 from '../assets/e-commerce.png'
import image2 from '../assets/interaction.png'
import {  FaNode, FaCss3, FaHtml5 ,FaDocker  } from 'react-icons/fa';
import { IoLogoNodejs } from "react-icons/io";
import { BiLogoMongodb } from "react-icons/bi";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io5";


const projects = [
  {
    id: 1,
    name: 'E-commerce Website',
    githubLink: 'https://github.com/',
    description: 'Developed a feature-rich e-commerce website showcasing modern clothing and sneakers, integrating secure payment gateways and user-friendly interfaces.',
    img: image1,
    link: 'https://example.com/',
    tools: [
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3 },
      { name: 'Javascript', icon: IoLogoJavascript },
      { name: 'Node.js', icon: IoLogoNodejs },
      { name: 'Mongo DB', icon: BiLogoMongodb },
      { name: 'Docker', icon: FaDocker },
    ],
    
  },

  {
    id: 2,
    name: 'Interaction 2024',
    githubLink: 'https://github.com/',
    description: 'Developed the backend for Interaction24.Moderncollege.in using Node.js, enabling secure event booking with a dynamic registration form.',
    img: image2,
    link: 'https://example.com/',
    tools: [
      { name: 'Sql', icon:AiOutlineConsoleSql},
      { name: 'Javascript', icon:IoLogoJavascript},
      { name: 'Node.js', icon: IoLogoNodejs },
      { name: 'Docker', icon: FaDocker },
    ],
  },
]

const Project: React.FC = () => {
  return (
    <>
     <h1 className='text-3xl mb-5'>Projects</h1>
     <div className='flex flex-col md:flex-row gap-20 md:gap-24 justify-center pt-10 items-center md:items-stretch w-full'>

     
     {projects.map(project => (
          <Card
          key={project.id}
          id={project.id}
          name={project.name}
          githubLink={project.githubLink}
          description={project.description}
       img={project.img}
       link={project.link}  
       tools={project.tools}   
          />
        ))}
        </div>
    </> 
  )
}

export default Project