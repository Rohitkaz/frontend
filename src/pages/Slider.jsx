import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import Card from "./Card";
import CardC from "./CrouselCard";
const Slider = ({ popularpost, trending }) => {
  console.log(popularpost);
  console.log(trending);
  const [current, setCurrent] = useState(0);
  const [array, setArray] = useState([
    {
      maintitle: "Heading1",
      discription:
        "lorem dflfsdgsdglagdg ddsggsgsdlg sadgasada;gsdgsd;ggasdagsldg;sdg",
      author: "Rohit",
      createdAt: "03/04/24",
    },
    {
      maintitle: "Heading2",
      discription: "lorem dflfsdgsdglagd",
      author: "Rohit",
      createdAt: "03/04/24",
    },
    {
      maintitle: "Heading3",
      discription:
        "lorem dflfsdgsdglagdg ddsggsgsdlg sadgasada;gsdgsd;ggasdagsldg;sdg",
      author: "Rohit",
      createdAt: "03/04/24",
    },
    {
      maintitle: "Heading4",
      discription:
        "lorem dflfsdgsdglagdg ddsggsgsdlg sadgasada;gsdgsd;ggasdagsldg;sdg",
      author: "Rohit",
      createdAt: "03/04/24",
    },
  ]);
  const lefttranslate = () => {
    if (current === 0) {
      setCurrent(array.length - 1);
    } else setCurrent(current - 1);
  };
  const Righttranslate = () => {
    if (current === array.length - 1) {
      setCurrent(0);
    } else setCurrent(current + 1);
  };
  return (
    <div className="w-[100%]  flex md:flex-row flex-wrap   bg-gray-200 md:ml-10">
      <div className="w-[100%] md:w-[650px]">
        <h1 className="font-heading font-bold md:text-3xl text-2xl">
          Popular posts
        </h1>
        <div className="flex items-center mb-10 border-2 border-gray-700 md:m-3 m-1  overflow-hidden relative  md:w-[650px] w-[94%] h-[450px] p-2  rounded-lg shadow-xl ">
          <div
            className={`   flex flex-row    md:gap-7 gap-12 transition-all ease-out duration-300

           md:ml-[32px]    md:mr-5 `}
            style={{ transform: `translateX(-${current * 320}px)` }}
          >
            {popularpost.map((item) => (
              <CardC blogdata={item} />
            ))}
          </div>
          <div className=" flex flex-row absolute top-[47%] md:gap-[580px] w-full justify-between   ">
            <button onClick={lefttranslate} className="">
              <BsFillArrowLeftCircleFill className="w-[30px] h-[30px]" />
            </button>
            <button onClick={Righttranslate} className="pr-2">
              <BsFillArrowRightCircleFill className="w-[30px] h-[30px] right-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="  md:ml-20">
        <h1 className="font-heading font-bold md:text-3xl text-2xl">
          Trending posts
        </h1>
        <div className="  flex gap-4 h-[450px] md:w-[350px] w-[320px] pl-2 md:pl-4 overflow-x-hidden shadow-lg  pt-2 md:m-3 ml-1 mt-3   flex-col   overflow-y-scroll border-2  border-gray-700     scrollbar-track-stone-100 rounded-lg ">
          {trending.map((item) => (
            <Card blogdata={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Slider;
