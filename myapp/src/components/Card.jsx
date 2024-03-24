import React, { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ToggleButton from '@mui/material/ToggleButton';
import '../css/card.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom'

function Card({ event }){

    const email = useSelector(state => state.userInfo.email);
    const likeList = useSelector(state => state.userInfo.likeList);
    const navigate = useNavigate();

    const [liked, setLiked] = useState(likeList.find(likedEvent => event.id===likedEvent.id) ? true : false)

    const handleToggle = () => {
        email ? (
            // Using event id, update the liked state in the database
            axios.post("http://127.0.0.1:8000/likes/", {"email":email, 'action': 'LIKE_OR_UNLIKE' , "event_id": event.id, "liked": !liked }
            ).then((res) =>{
                console.log(res.data);
                setLiked(!liked);
            }
            ).catch(err=>console.log(err)
            )
        ) : (
            navigate('/login')
        );
        
    };

    return (
        <div className="card" >
            <div className='event'>
                <div className='event-img'>
                    <img src={"http://127.0.0.1:8000/" + event.image} alt="" />
                </div>
                <div className='event-details'>
                    <h3>{event.event_title}</h3>
                    <p>{event.description}</p>
                    <span><p>Start Date: {event.start_date}</p><p>End Date: {event.end_date}</p></span>
                    <span><p>Time: {event.start_time.substring(0,5)} to {event.end_time.substring(0,5)}</p></span>
                    <p>Location: {event.location}</p>
                </div>
            </div>
            <div className='like-button'>
                <ToggleButton
                    value="check"
                    selected={liked}
                    onChange={handleToggle}
                >
                    <FavoriteRoundedIcon style={{ color: liked ? 'red' : 'gray' }} />
                </ToggleButton>
            </div>
        </div>
    );
}

export default Card;