import React from "react";
import { useState } from "react";

import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuthcontext } from "./context";
const Commentcard = ({
  comment,
  index,
  change,

  changecomments,
}) => {
  const [clikes, setClikes] = useState(comment.likes);
  const [isTrue, setIsTrue] = useState(false);
  const [reply, setReply] = useState();
  const [replyindex, setReplyindex] = useState();
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const [replies, setReplies] = useState([]);
  const [showButtons, setShowbuttons] = useState(false);
  const [isdeleting, setisdeleting] = useState(false);
  const context = useAuthcontext();
  const showButton = () => {
    if (showButtons === true) setShowbuttons(false);
    else setShowbuttons(true);
  };
  const deletecomment = async () => {
    if (!context.user) {
      return alert("First Login to delete comments!");
    }
    if (context.user.id !== comment.userId) {
      return alert("you can delete only your comments!");
    }
    setisdeleting(true);
    try {
      const res = await axios.delete(
        `https://blog-backend-u88k.onrender.com/deletecomment/${comment._id}/${comment.postId}/${comment.parentId}`,

        {
          withCredentials: true,
        }
      );

      changecomments(comment);
      setisdeleting(false);
    } catch (err) {
      setisdeleting(false);
      alert(err.message);
    }
  };
  const sendReply = async (e) => {
    if (!context.user) {
      return alert("First Login to send reply");
    }
    if (!reply) {
      return alert("reply cannot be empty");
    }

    const comm = {
      blog_id: comment.postId,
      commentid: e.target.id,
      commreply: reply,
      parentUsername: comment.username,
    };
    console.log(comment.postId);
    try {
      const res = await axios.post(
        `https://blog-backend-u88k.onrender.com/reply`,
        comm,
        {
          withCredentials: true,
        }
      );

      change(res.data, comment.parentId, index);
    } catch (err) {
      console.log(err.message);
    }
  };
  const setlike = () => {
    setClikes((prev) => prev + 1);
  };
  const likecomment = async () => {
    const commentid = comment._id;
    try {
      const res = await axios.post(
        `https://blog-backend-u88k.onrender.com/likecomments`,
        { commentid: commentid },
        {
          withCredentials: true,
        }
      );
      if (res.data == "like") setlike();
      if (res.data == "dislike") setClikes((prev) => prev - 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center w-[100%] h-[90%] gap-1 rounded-lg   ">
      <div className="flex flex-row w-[100%] gap-2">
        <img className="w-[30px] h-[30px]" src="/images/user.png"></img>
        <div className="flex flex-row w-[90%] h-[10%]  font-heading text-sm font-bold gap-2 mt-1">
          <div>{comment.username}</div>
          {comment.parentUsername ? (
            <div className="text-blue-700">@{comment.parentUsername}</div>
          ) : null}
        </div>
        <div className=" flex flex-col w-[80%] items-center gap-1  ">
          <BsThreeDotsVertical
            className=" mt-1 ml-[50%]"
            onClick={showButton}
          />
          {showButtons ? (
            <div className="  w-[100%] flex justify-center ">
              {isdeleting ? (
                <div className="text-red-700 font-heading font-bold">
                  deleting...
                </div>
              ) : (
                <button
                  onClick={deletecomment}
                  className=" ml-[40%] w-[50%] bg-gray-500 font-heading font-bold  hover:bg-red-700 border-2 border-gray-300 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="  font-heading w-[87%]  border-2 border-gray-500 rounded-md mt-2">
        {comment.content}
      </div>
      <div className="flex flex-row w-[87%] font-heading justify-between ">
        <button
          onClick={likecomment}
          className="p-1 bg-gray-500 text-black font-heading font-bold hover:text-green-400 rounded-md hover:translate-x-1 duration-150"
        >
          Like({clikes})
        </button>
        <div className=" p-1 flex  flex-row bg-gray-500 justify-center items-center rounded-md hover:translate-x-1 duration-150  ">
          <label className="text-black font-heading font-bold hover:text-green-600">
            Reply
          </label>
          {isTrue ? (
            <IoIosArrowUp
              className="  w-[30%]  items-center"
              onClick={() => {
                setIsTrue(false);
                setReplyindex(-1);
              }}
            />
          ) : (
            <FaAngleDown
              id="up"
              className=" w-[30%]  items-center"
              onClick={() => {
                setIsTrue(true);
                setReplyindex(index);
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`flex w-[87%] h-[40%] transition-opacity duration-500 ${
          isTrue ? "opacity-100" : "opacity-0"
        }`}
      >
        {isTrue && replyindex === index ? (
          <div className="flex flex-col w-[100%] h-[100%] justify-items-start ">
            <textarea
              className={`border-2 border-gray-500 font-heading w-[100%] h-[100%] 
    `}
              rows="2"
              cols="30"
              placeholder="enter your reply"
              name={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            ></textarea>

            <button
              onClick={sendReply}
              id={comment._id}
              className="border-2 border-black text-center w-[20%] bg-slate-400 text-white rounded-md"
            >
              send
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Commentcard;
