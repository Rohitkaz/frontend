import React from "react";
import { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Commentcard from "./commentcard";
import { useAuthcontext } from "./context";
const CommentBar = ({ blogid, blogauthor, change, deccomment }) => {
  const [comment, setComment] = useState();
  const context = useAuthcontext();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const changereplies = (replies, parentId, index) => {
    console.log(comment);
    setReplies(replies);
    if (parentId == null) {
      setShowreplies(true);
      setShowreplyindex(index);
    }
  };
  const changecomments = (comment) => {
    if (comment.parentId === null) {
      const comms = comments.filter((item) => item != comment);
      deccomment();
      setShowreplies(false);
      setComments(comms);
    } else {
      const rep = replies.filter((item) => item != comment);
      setReplies(rep);
    }
  };

  const sendComment = async () => {
    if (!context.user) {
      return alert("First Login to send comments");
    }
    if (!comment) {
      return alert("Comment cannot be empty");
    }
    console.log(blogauthor);
    const comm = {
      blog_id: blogid,
      comment: comment,
      blogauthor: blogauthor,
    };
    change();

    console.log(blogid);
    try {
      const res = await axios.post(
        `https://blog-backend-u88k.onrender.com/newblog/comment`,
        comm,
        {
          withCredentials: true,
        }
      );
      if (comments.length > 0) {
        setComments((prev) => [res.data, ...prev]);
      } else {
        showcomments();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const showcomments = async () => {
    const comms = await axios.get(
      `https://blog-backend-u88k.onrender.com/newblog/showcomments/${blogid}`,
      {
        withCredentials: true,
      }
    );

    const comm = comms.data;
    console.log(comm);
    setComments(comm);
  };
  return (
    <div className="flex flex-col w-[100%] border-2 items-center gap-1 border-none h-dvh ">
      <div className="w-[100%] h-[5%]"></div>
      <textarea
        Name={comment}
        placeholder="What's Your Thought?"
        cols="30"
        rows="2"
        className="font-heading w-[87%] border-2 border-black rounded-lg pl-2 pt-1"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <button
        onClick={sendComment}
        className="font-heading w-[87%] rounded-lg text-white bg-blue-700 hover:text-black h-[30px]"
      >
        Send
      </button>
      <button
        onClick={showcomments}
        className="font-heading w-[87%] rounded-lg text-white bg-blue-700 hover:text-black h-[30px]"
      >
        Showcomments
      </button>
      <div className="flex flex-col w-[100%] h-[80%]  items-center gap-1 mt-2 overflow-y-scroll scrollbar-thin  ">
        {comments.map((comment, index) => (
          <>
            <div className="flex flex-col w-[87%]  items-center  mt-2 border-2 border-red">
              <Commentcard
                comment={comment}
                index={index}
                change={changereplies}
                changecomments={changecomments}
              />
              <button
                id={comment._id}
                onClick={async (e) => {
                  if (showreplies == true) {
                    setShowreplies(false);
                    setShowreplyindex(-1);
                  } else {
                    const res = await axios.get(
                      `https://blog-backend-u88k.onrender.com/newblog/showreplies/${blogid}/${e.target.id}`,

                      {
                        withCredentials: true,
                      }
                    );
                    setReplies(res.data);
                    setShowreplies(true);
                    setShowreplyindex(index);
                  }
                }}
                className="font-heading w-[87%] mt-0 rounded-lg text-white bg-blue-700 h-[30px]"
              >
                Replies
              </button>
            </div>
            {showreplies && showreplyindex === index ? (
              <>
                {replies.map((comment, index) => (
                  <div className="w-[77%] border-2 border-emerald-600 ml-10">
                    <Commentcard
                      comment={comment}
                      index={index}
                      change={changereplies}
                      changecomments={changecomments}
                    />
                  </div>
                ))}
              </>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};
export default CommentBar;
