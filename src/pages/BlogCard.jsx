import React, { useState } from "react";
import { Link } from "react-router-dom";
const BlogCard = ({ blogdata, slideindex, index }) => {
  const defaultimg = (e) => {
    e.target.src = "./images/noimage.png";
  };
  return (
    <div
      className={` flex  flex-col gap-1 w-[100%]  border-2 shadow-lg shadow-gray-400 h-[100%]  bg-orange-300  rounded-lg rounded-t-lg z-7 ${
        slideindex === index ? null : "hidden"
      }`}
    >
      <img
        src={`https://blog-backend-u88k.onrender.com/images/${blogdata.image}`}
        onError={defaultimg}
        className="w-[100%] h-[60%] rounded-t-lg "
      ></img>
      <div className=" ml-[4%] flex w-[100%] h-[15%] text-center font-heading font-bold text-xl md:text-2xl  ">
        {blogdata.maintitle}
      </div>
      <div
        className="  ml-[4%] flex  w-[100%] h-[13%] text-start font-heading font-bold
          line-clamp-2 text-wrap "
      >
        {blogdata.description}
      </div>

      <div className=" sticky flex  flex-row w-[100%] h-[13%] font-heading font-semibold text-center mt-2 gap-2 ">
        <img
          className="h-[100%] w-[10%]  rounded-[47%] object-cover ml-2 "
          src="images/user.png"
        ></img>

        <div className=" flex flex-col h-[100%] text-center   pt-1 ">
          <div className=" flex  h-[100%] text-center   ">
            {" "}
            {blogdata.author}{" "}
          </div>
          <div className=" flex  h-[100%] text-center   ">
            {" "}
            {blogdata.createdAt}{" "}
          </div>
        </div>
        <div className=" md:ml-[50%] ml-[30%] hover:-translate-x-1 transition-all duration-75 ease-in-out z-5 shadow-md flex items-center bg-slate-50   rounded-lg h-[70%] flex-row border-2  border-white">
          <Link
            to={`/Blog/${blogdata._id}`}
            className="  hover:text-cyan-700  "
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
