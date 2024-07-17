import { useEffect } from "react";
import ButtonAppBar from "../../components/Navbar/Navbar";
import "./Home.css";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const [data, setData] = useState([]);
  const fetchAllPost = async () => {
    try {
      const data = await axios.get("http://localhost:4000/get_post");
      setData(data.data.AllPost);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchAllPost();
  }, [loading]);
  const userId = localStorage.getItem("UserId");
  const handleDelete = async (id) => {
    try {
      setLoading(!loading);
      const res = await axios.delete(`http://localhost:4000/post/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLikeBtn = async (postId, userId) => {
    try {
        const response = await axios.get(`http://localhost:4000/get_post/${postId}`);
        const UserId=localStorage.getItem('UserId');
        const userLiked = response.data.post.Liked.filter(item=>item==UserId);
      console.log("user liked",userLiked);
        if (userLiked.length==0) {
            const res = await axios.put('http://localhost:4000/post/like', { postId, UserId });

            setData(prevData => {
                const updatedData = prevData.map(item => {
                    if (item._id === postId) {
                        return { ...item, LikeCount: res.data.LikeCount, Liked: res.data.Liked };
                    }
                    return item;
                });
                return updatedData;
            });
        } else {
            console.log('User has already liked this post.');
        }
    } catch (err) {
        console.error('Error liking post:', err);
    }
};
const handleCard=(postId)=>{
  navigate(`/show_post/${postId}`);
}


  return (
    <div>
      <ButtonAppBar />
      <div className="post_card">
        <ClipLoader
          loading={data.length == 0}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {data.length > 0 &&
          data.map((item, index) => {
            const date = new Date(item.time);
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            const day = date.getUTCDate();
            const month = monthNames[date.getUTCMonth()];
            const year = date.getUTCFullYear();
            return (
              <div key={index}>
                <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.User.Name[0].toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings" onClick={() => handleDelete(item._id)} >
                        {userId == item.User._id && (
                          <ClearIcon/>
                        )}
                      </IconButton>
                    }
                    title={item.User.Name}
                    subheader={`${month} ${day} ${year}`}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.ImageURL}
                    alt="Paella dish"
                    onClick={()=>handleCard(item._id)}
                  />
                  <CardActions
                    disableSpacing
                    sx={{ justifyContent: "space-between" }}
                  >
                    <IconButton aria-label="add to favorites" onClick={()=>handleLikeBtn(item._id,item.User._id)}>
                      <FavoriteIcon/>
                      <p>{item.LikeCount }</p>
                    </IconButton>
                    <IconButton aria-label="share" onClick={()=>handleCard(item._id)}>
                      <CommentIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
