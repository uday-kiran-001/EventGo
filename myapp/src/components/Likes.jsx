import Header from "./Header";
import Card from './Card'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setLikeList } from "../store/user/userSlice";
import '../css/styles.css'


const Likes = ()=>{

    const likeList = useSelector(state => state.userInfo.likeList);
    const email = useSelector(state => state.userInfo.email);
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/likes/', { 'email': email, 'action': 'GET_LIKE_LIST' }
        ).then(res=>{
          console.log(res.data);
          dispatch(setLikeList(res.data.likeList))
        }).catch(e=>console.log(e))
      }, []);

    return(
        <div>
            <Header />

            <div className="like-list">
                <h2>Liked Events</h2>
                { likeList.length > 0 ? (
                    likeList.map(event => {
                        return(
                            <Card 
                                key={event.id}
                                event = {event}
                            />
                        )
                    })) : (
                        <div className="message">Empty</div>
                    )}
            </div>
        </div>
    );
};

export default Likes;