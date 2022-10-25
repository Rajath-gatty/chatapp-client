import React,{useState} from "react";
import styled from "styled-components";
import { AccountCircle, CameraAlt } from "@material-ui/icons";
import MultiSidebar from "./MultiSidebar";
import {CircularProgress,Switch} from "@material-ui/core";
import {useGlobalContext} from "../Context/Context";
import axios from "axios";

const Profile = () => {
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const {closeProfileSidebar,user,changeProfileUrl,darkMode,toggleThemeMode} = useGlobalContext();

    const handleProfileChange = async(e) => {
        const file = e.target.files[0];
        if(!file) return;

        if(!(file.type === 'image/jpeg' || file.type === 'image/png')){
            setError('Please upload a valid image');
        } else if(((file.size/1024)/1024) > 2){
            setError('File size must be less than 2MB');
        } else {
            setError('');
            try {
                setLoading(true);
                const form = new FormData();
                form.append('profile',file);
                form.append('profileUrl',user.profileUrl);
                 const result = await axios.post("api/user/profile",form);
                 if(result.status===200){
                    changeProfileUrl(result.data);
                    setLoading(false);
                    const data = JSON.parse(localStorage.getItem('user'));
                    data.user.profileUrl=result.data;
                    localStorage.setItem('user',JSON.stringify(data));
                 }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    return (
        <MultiSidebar heading="Profile" onClose={closeProfileSidebar}>
            <Wrapper darkMode={darkMode}>
                <div className="img__wrapper">
                    <div className="container">
                        <div className="profile__img">
                        {loading?
                        <div className="loading"><div className="spinner"><CircularProgress size="3rem" style={{color:"#ffffff"}}/></div></div>:
                        <><input type="file" id="profile" onChange={handleProfileChange}/>
                        <label htmlFor="profile" className="change__photo" id="profile"><span><CameraAlt /></span><span>CHANGE PHOTO</span></label></>}
                        </div>
                        {!user.profileUrl?
                        <AccountCircle  style={{ fontSize: 220}} color="#ccc"/>:
                        <img src={user.profileUrl} alt="profile" className="img"/>}
                    </div>
                    <p className="error">{error}</p>
                </div>
                <div className="profile__details__wrapper">
                    <div className="theme__mode">
                        <p className="detail_hdng">Dark Mode</p>
                        <Switch color="primary" checked={darkMode} onClick={toggleThemeMode}/>
                    </div>
                    <div className="profile__details">
                        <p className="detail_hdng">Name</p>
                        <p  className="user-detail">{user.name}</p>
                    </div>
                    <div className="profile__details">
                        <p className="detail_hdng">Username</p>
                        <p className="user-detail">{user.username}</p>
                    </div>
                    <div className="profile__details">
                        <p className="detail_hdng">Email</p>
                        <p className="user-detail">{user.email}</p>
                    </div>
                </div>
                </Wrapper>
        </MultiSidebar>
    )
}

const Wrapper = styled.section`
height: 100%;
.MuiCircularProgress-root {
    padding:5px;
}

    .img__wrapper {
        align-self: center;
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
    }
    .container {
        position: relative;
    }

    .theme__mode {
        display: flex;
        gap:5rem;
        align-items: center;
    }

    .profile__img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 85%;
        height: 81%;
        border-radius: 50%;
        transform: translate(-50%,-50%);
    }

    .error {
        color: red;
        font-size: 0.75rem;
    }

    .profile__img label {
        background-color: rgba(20, 55, 64,0.5);
        width: 100%;
        height: 100%;
    }

    .profile__img label:hover {background-color: rgba(20, 55, 64,0.6);}

    .img {
        width:187px;
        height:187px;
        border-radius: 50%;
        object-fit: cover;
    }

    .img__wrapper svg {
        color: #ccc;
        margin-top: 0.25rem;
    }

    .img__wrapper input {
        display: none;
    }
    .change__photo {
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1rem;
        cursor : pointer;
        font-size: 14px;
    }

    .change__photo  svg {
        color: #fff;
    }

    .profile__details__wrapper {
        margin-top: 0.5rem;
        padding:0rem 1.5rem;
    }
    .profile__details {
        padding: 1rem 0rem;
    }

    .detail_hdng {
        color:#077838;
        margin-bottom: 0.5rem;
    }

    .user-detail {
        color:  ${({darkMode}) => darkMode ? "#ffffff" : "#333333"};
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;

export default Profile;