import React from 'react';
import { IconType } from 'react-icons';

interface Tool {
  name: string;
  icon: IconType;
}

interface Project {
    key: number;
    id: number;
    name: string;
    description: string;
    githubLink: string;
    link: string;
    img: string;
    tools:  Tool[];
}

const Card: React.FC<Project> = (props) => {
  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg p-4  bg-white/10 backdrop-blur-md">
      <img className="w-full rounded-2xl" src={props.img} alt={props.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-white text-base">{props.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className='pb-2'>My Dev Tools : </p>
        <div className="flex flex-wrap">
        {props.tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center">
              <Icon className="text-lg mr-1" />
              {tool.name}
            </span>
          );
        })}
        </div>
      
      </div>
      <div className="px-6 pt-4 pb-2 bottom-0">
        
        <a href={props.link} className="text-red-500 hover:text-red-700 ml-4">Live Demo</a>
      </div>
    </div>
  );
};

export default Card;
