import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setEmailId} from '../store/user/userSlice';
import '../css/authStyles.css'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ()=>{

  const navigate = useNavigate();
  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  function handleSignUp(e){
    e.preventDefault();
    console.log(email, password)

    axios.post("http://127.0.0.1:8000/signup/", {"email":email, "password":password }
    ).then((res) =>{
      // Collect User Id, Liked List, Created List
      console.log(res);
      const { message, status } = res.data;
      if(status === 'success'){
        dispatch(setEmailId(email));
        
        navigate('/');
      }else{
        console.log(message);
        setEmail('');
        setPassword('');
      }
      
    }
    ).catch(err=>console.log(err.response.data)
    );
  }

  return (
    <div className='auth-base'>
        <form className='auth-form' onSubmit={handleSignUp}>
            <div className='auth-input'>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className='auth-input'>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={p=>setPassword(p.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className='auth-input'>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </div>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
        
    </div>
  );
}

export default SignUp;
