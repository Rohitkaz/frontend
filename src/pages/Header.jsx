import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
import { useAuthcontext } from "./context";
import { Navigate } from "react-router-dom";
const Header = () => {
  const [ishidden, setIsHidden] = useState(false);
  const [inputwidth, setInputwidth] = useState("w-[60%]");
  const [isTrue, setIsTrue] = useState(false);
  const context = useAuthcontext();

  const navigate = useNavigate();
  const logout = async () => {
    const result = await axios.get(
      "https://blog-backend-u88k.onrender.com/Auth/logout",

      {
        withCredentials: true,
      }
    );
    if (result.status === 204) {
      navigate("/login");
    }
  };
  const openham = () => {
    setIsTrue(true);
    setInputwidth("w-[10%]");
    setIsHidden(true);
  };
  const closeham = () => {
    setIsTrue(false);
    setInputwidth("w-[60%]");
    setIsHidden(false);
  };

  return (
    <div className=" flex flex-row w-screen bg-black h-[40px] mt-[0px]  fixed z-10">
      <div
        className={`flex flex-row ${inputwidth} md:w-[40%] h-[100%] gap-2 justify-center ml-[3%] md:ml-0 `}
      >
        <div className=" flex font-heading  font-bold  text-xl md:text-2xl text-white items-center   ">
          Blogit
        </div>

        <CiSearch className=" text-white font-heading  h-[100%] w-[18px] text-center mt-0.5" />
        <input
          type="text"
          placeholder="Search..."
          className=" text-white bg-black outline-none "
        ></input>
      </div>
      <div className="flex w-[100%]  md:w-[60%] h-[100%]  justify-end z-10 md:flex-row  ">
        <div
          className={`  flex-col h-dvh md:opacity-[100%]   mr-0 font-heading text-xl    md:w-[100%] font-bold  md:bg-black md:flex  md:flex-row  md:h-[100%] text-white list-none gap-[5%] flex items-center  md:justify-end md:pr-[10%] bg-pink-600  ${
            isTrue
              ? "w-[100%] transition-all delay-75 duration-500 ease-in-out opacity-100 "
              : "w-[0%] opacity-0"
          }`}
        >
          <MdClose className=" md:hidden h-[10%] w-[20%]" onClick={closeham} />
          <li className="hover:text-cyan-600">
            <Link to="/">Home</Link>
          </li>
          {context.user ? (
            <li className={`hover:text-cyan-600  `}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <li className={`hover:text-cyan-600  `}>
              <Link to="/Login">Login</Link>
            </li>
          )}
          {context.user ? (
            <li className={`hover:text-cyan-600  `}>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li className={`hover:text-cyan-600 `}>
              <Link to="/Register">Register</Link>
            </li>
          )}
        </div>
        <RxHamburgerMenu
          className={`md:hidden text-white h-[100%]  w-[20%] mr-5 ${
            ishidden ? "hidden" : null
          }
        
          `}
          onClick={openham}
        />
      </div>
    </div>
  );
};
export default Header;
