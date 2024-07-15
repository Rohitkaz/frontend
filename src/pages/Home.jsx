import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
import Header from "./Header";

import { MdElectricalServices } from "react-icons/md";
import NewBlogCard from "./Newblogcard";
const Home = () => {
  const post = useLoaderData();
  const Latestpost = post.Latestpost;
  const Trending = post.Latestpost;
  const Popularpost = post.Popularpost;

  const len = Popularpost.length - 1;
  console.log(len);
  const [slideindex, setslideIndex] = useState(0);
  const decind = () => {
    if (slideindex === 0) setslideIndex(len);
    else setslideIndex((prev) => prev - 1);
  };
  const incind = () => {
    if (slideindex === len) {
      setslideIndex(0);
    } else setslideIndex((prev) => prev + 1);
  };
  return (
    <>
      <div className="flex flex-col w-screen md:h-screen     ">
        <Header />
        <div className=" flex flex-col md:flex-row w-[100%]  h-[95%]   mt-[40px] md:gap-[3%] gap-7  ">
          <div className=" flex flex-col  ml-[3%] md:w-[58%] w-[90%] h-[100%]  gap-3  ">
            <div className="flex font-heading text-3xl font-extrabold  w-[100%]  h-[7%] mt-2  ">
              |Popular Blogs
            </div>
            <div className="flex flex-row   w-[100%]  h-[90%]   relative ">
              <BsArrowLeftCircle
                onClick={decind}
                className="w-[10%]  md:h-[5%] h-[10%] absolute  mt-[35%]  hover:text-red-600 z-5 shadow-sm "
              />

              {Popularpost.map((blog, index) => (
                <BlogCard
                  blogdata={blog}
                  slideindex={slideindex}
                  index={index}
                />
              ))}

              <BsArrowRightCircle
                onClick={incind}
                className="w-[10%]  md:h-[5%] right-1 z-5 h-[10%] hover:text-red-600  mt-[35%] absolute"
              />
            </div>
          </div>
          <div className="flex flex-col  md:ml-[0px] ml-[3%] w-[90%] md:w-[33%]  h-[100%]  gap-3  ">
            <div className="flex font-heading text-3xl font-extrabold  w-[100%]  h-[7%] mt-2  ">
              |Trending Blogs
            </div>
            <div className=" flex flex-col p-1 md:overflow-y-scroll overscroll-x-none scroll-smooth scrollbar-thin  gap-4  md:w-[94%] w-[100%] h-[93%]  ">
              {Trending.map((blog, index) => (
                <NewBlogCard blogdata={blog} />
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-col w-[100%]  h-[100%]   mt-[40px] gap-[35px]  ml-[3%] ">
          <div className="flex font-heading text-3xl font-extrabold  w-[100%]  h-[7%] mt-2  ">
            |Latest Blogs
          </div>
          <div className="flex flex-col md:flex-wrap md:flex-row w-[100%]  h-[100%] md:gap-[2%] gap-5 ">
            {Latestpost.map((blog, index) => (
              <div className="flex w-[90%] md:w-[23%] h-[100%] gap-[3%] ">
                <NewBlogCard blogdata={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
