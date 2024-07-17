
import Navbar from '../../components/Navbar/Navbar'
import * as React from 'react';
import { useState, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { app } from '../../firebase/firebase';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Post() {
  const [inputValue, setInputValue] = React.useState('');
  const [image,setImage]=useState(false);
  const [imageURL,setImageURL]=useState('');
  const [uploading,setUploading]=useState(false);
  const [disable,setDisable]=useState(false);
  const handleFileChange = async(event) => {
    setUploading(true);
    setImage(event.target.files[0]);

    const image=event.target.files[0];
    if(image){
      const Storage=getStorage(app);
      const StorageRef=ref(Storage,"Images/"+image.name);
      await uploadBytes(StorageRef,image);
      const downloadURL=await getDownloadURL(StorageRef);
      setImageURL(downloadURL);
      setUploading(false);

    }
  };



  const handleSubmit = async(event) => {
    event.preventDefault();
    setDisable(true);
    const data = new FormData(event.currentTarget);
    const Title=data.get('title');
    const UserId=localStorage.getItem("UserId");
    const Data={
      "title":Title,
      "ImageURL": imageURL,
      "UserId":UserId
    }
    try{
      const PostBlog=await axios.post('http://localhost:4000/post',Data);
      toast.success('🦄 Post Posted Successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        setDisable(false);
    }catch(err){
      toast.error('🦄 Creating Post Falied!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        setDisable(false);
    }
    
  };

  return (
    <>
    <Navbar/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ff1744' }}>
            <EditNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Post
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          
          {image && <div className='image_box'>
            <img src={imageURL} alt='image' className='image'/>
          </div>}

          <Grid container spacing={2} sx={{marginBottom:"10px"}}>
            <Grid item xs={12} sm={6}>
            <Button
              disabled={uploading}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {uploading?("uploading"):("upload image")}
              <VisuallyHiddenInput type="file" 
                      onChange={handleFileChange} />
            </Button>
            </Grid>
            
          </Grid>


            <Grid container spacing={2}>
              <Grid item xs={16} sm={16}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Enter your title"
                  autoFocus
                />
              </Grid>


              <Grid container spacing={2} sx={{marginTop:"5px",marginLeft:"0px"}}>
                <Grid item xs={12} sm={12}>
                </Grid>
              </Grid>

              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disable}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
    </>
  );
}





