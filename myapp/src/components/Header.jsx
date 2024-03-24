import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../css/styles.css'
import { useSelector } from 'react-redux'
import  { useNavigate, Link } from 'react-router-dom'


function Header(props){

    const email = useSelector(state => state.userInfo.email);
    const [query,setQuery]=React.useState("");
    const navigate = useNavigate();

    function handleQueryChange(event){
        console.log(event.target.value);
        setQuery(event.target.value);
    }

    function handleQuerySubmit(e){
        e.preventDefault();
        console.log(query)
    }

    function handleLikes(){
        email ? navigate('/likes') : navigate('/login');
    }

    function handleAddEvent(){
        email ? navigate('/addevent') : navigate('/login');
    }

    return <div className='nav-bar' >
            
            <div className='search-bar'>
                <form className='search-form' onSubmit={handleQuerySubmit}>
                    <div className='searchbar-input'>
                        <input type="text" name="query" onChange={handleQueryChange} id="search-query" placeholder='Search...'/>
                    </div>
                    <IconButton>
                        <SearchIcon 
                            type= 'submit'
                        />
                    </IconButton>
                </form>
            </div>
            <h2><Link to='/' >EventGo</Link></h2>
            <div>
                <div className='navbar-icon' onClick={handleAddEvent}>
                    <div><img src={require("../public/images/add_icon.png")} alt="" /><p>Create an event</p></div>
                </div>
                <div className='navbar-icon' onClick={handleLikes}>
                    <div><img src={require("../public/images/like_icon.png")} alt="" /><p>Likes</p></div>
                </div>
                {
                    !email ?
                    (
                        <div>
                            <div className='navbar-btn'>
                                <Button color='success' variant="contained" href="/login">
                                    Login
                                </Button>
                            </div>
                            <div className='navbar-btn'>
                                <Button color='success' variant="contained" href="/signup">
                                    SignUp
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='navbar-icon'>
                            <div><img src={require("../public/images/user_icon.png")} alt="" /><p>{email}</p></div>
                        </div>
                    )
                }
            </div>
        </div>
}

export default Header;