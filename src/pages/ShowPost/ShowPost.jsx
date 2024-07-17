import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowPost.css";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const ShowPost = () => {
  const { postId } = useParams();
  const [data, setData] = useState([]);
  const [content,setcontent]=useState(null);
  const [comments, setComments] = useState([]);
  const fetchPost = async () => {
    try {
      const data = await axios.get("http://localhost:4000/get_post");
      const res = data.data.AllPost.filter((item) => item._id == postId);
      setData(res);
      const post = await axios.get(`http://localhost:4000/get_post/${postId}`);
      const comment=await axios.get('http://localhost:4000/get/comment');
      const filteredComments = comment.data.filter(comment => post.data.post.Comments.includes(comment._id));
      setComments(filteredComments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [comments]);
  const handleChange=(event)=>{
    event.preventDefault();
    const value=event.target.value;
    setcontent(value);
  }
  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("UserId");
      const res = await axios.put('http://localhost:4000/post/comment', { postId, userId, content });
      setData([res.data]);
      setcontent("");
      const post = await axios.get(`http://localhost:4000/get_post/${postId}`);
      const comment=await axios.get('http://localhost:4000/get/comment');
      const filteredComments = comment.data.filter(comment => post.data.post.Comments.includes(comment._id));
      console.log("filter comment is",filteredComments);
      setComments(filteredComments);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div>
        {data.length != 0 && (
          <div>
            <div className="image_box">
              <img src={data[0].ImageURL} alt="image" className="image" />
            </div>
            <div className="like_section">
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <div>{data[0].LikeCount}</div>
              </IconButton>
            </div>
            <div className="comment_box">Comments:</div>
            <div className="comment_section">
              {
                comments.map((item,index)=>{
                  return(
                    <div key={index} className="comment_post">
                      <p>{item.content}</p>
                      <p>{item.user.Name}</p>
                      </div>
                  )
                })
              }
            </div>
            <div className="add_comment">
                    <TextField id="standard-basic" label="Comment" variant="standard" onChange={handleChange} />
                    <Button variant="contained" onClick={handleSubmit}>Add Comment</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPost;
