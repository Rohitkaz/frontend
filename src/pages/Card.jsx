import React from "react";
import { Link } from "react-router-dom";
const Card = ({ blogdata }) => {
  const defaultimg = (e) => {
    e.target.src = "./images/noimage.png";
  };
  return (
    // <div className=" flex justify-center w-screen h-screen bg-gray-200">
    <div className="flex  flex-col mt-2  md:w-[300px] w-[290px] h-[400px]  rounded-lg p-2 bg-white transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div className="w-full ">
        <img
          className="w-full aspect-auto object-cover rounded-lg"
          src={`https://blog-backend-u88k.onrender.com/newblog/images/${blogdata.image}`}
          onError={defaultimg}
        ></img>
      </div>
      <div className="p-2">
        <h2 className=" font-heading font-bold text-lg line-clamp-1">
          {blogdata.maintitle}
        </h2>
        <p className=" md:w-[265px] w-[245px] font-heading text-sm text-gray-600 line-clamp-2">
          {blogdata.description}
        </p>
      </div>
      <div className=" w-full flex flex-row   justify-between text-gray-600 ">
        <div className=" flex flex-row w-[50%]  gap-2">
          <img
            className="w- h-[38px] rounded-full aspect-auto object-cover"
            src="./images/user.png"
          ></img>
          <div className="font-heading font-bold text-sm ">
            <h2 className="line-clamp-1">{blogdata.author}</h2>
            <h2>{blogdata.createdAt}</h2>
          </div>
        </div>

        <Link
          to={`/Blog/${blogdata._id}`}
          className="text-center text-white bg-purple-600 px-3 py-1.5 mr-1 rounded-lg font-heading hover:bg-purple-700"
        >
          Read More
        </Link>
      </div>
    </div>
    //  </div>
  );
};
export default Card;
