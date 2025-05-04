import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="w-full relative">
      <img
        src={assets.hero_img}
        alt="Lush green plants in a natural setting"
        className="w-full h-[500px] object-cover z-0"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Botaniczy – Grow with Nature</h1>
        <p className="text-lg md:text-xl mt-2 max-w-lg">
          Discover beautiful plants for any space and bring nature closer to you.
        </p>
        <NavLink to='/collection'>
          <button
            className="mt-4 px-6 py-3 bg-black border-2 text-white rounded-lg shadow-lg 
            hover:bg-white hover:text-black hover:border-black hover:cursor-pointer transition duration-300"
            aria-label="Explore plant collection"
          >
            Explore Now
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
