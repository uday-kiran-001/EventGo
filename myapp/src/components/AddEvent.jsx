import { FormControl, TextField } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setCreateList } from '../store/user/userSlice';
import { setEventList } from '../store/events/eventSlice';
import  { useNavigate } from 'react-router-dom'
import Header from './Header'


const AddEvent = ()=>{

    const navigate = useNavigate();
    const email = useSelector(state => state.userInfo.email );
    const createList = useSelector(state => state.userInfo.createList );
    const eventList = useSelector(state => state.eventList.events);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs().add(1, 'hour'));
    const [endTime, setEndtime] = useState(dayjs().add(2, 'hour'));
    const [location, setLocation] = useState('');


    function handleClick(e){
        // This line is important
        e.preventDefault();

        const formData = new FormData();

        formData.append('event_title', title);
        formData.append('start_date', dayjs(startDate).format('YYYY-MM-DD'));
        formData.append('image', image);
        formData.append('end_date', dayjs(endDate).format('YYYY-MM-DD'));
        formData.append('start_time', dayjs(startTime).format('HH:mm:ss.SSSSSS'));
        formData.append('end_time', dayjs(endTime).format('HH:mm:ss.SSSSSS'));
        formData.append('description', description);
        formData.append('location', location);
        formData.append('creator', email);
        
        axios.post("http://localhost:8000/addevent/", formData, { headers: { 'content-type': 'multipart/form-data' } }
        ).then((res) => {
            console.log(res.data);
            let { image_url } = res.data;
            const newEvent = {
                "event_title": title,
                "start_date": startDate,
                "image": image_url,
                "end_date": endDate,
                "start_time": startTime,
                "end_time": endTime,
                "description": description,
                "location": location,
                "creator" : email
            }
            console.log(newEvent);

            // Update Lists
            dispatch(setCreateList([...createList, newEvent]))
            dispatch(setEventList([...eventList, newEvent]))

            navigate('/');
        }
        ).catch(err=>console.log(err)
        );
    };



    return (
        <div className='addevent-base'>
            <Header />
            <div className='input-form'>
                <FormControl>
                    <h1>Build your event page</h1>
                    <p>Add all of your event details and let attendees know what to expect</p>
                    <div className='event-input'>
                        <TextField
                            id="event_title" 
                            required
                            label="Event Title"  
                            aria-describedby="event_title" 
                            value={title} 
                            onChange={(event) => setTitle(event.target.value)}
                            autoFocus
                        />
                    </div>
                    
                    <div className='event-input'>
                        <TextField
                            id="description"
                            label="Description"  
                            aria-describedby="description" 
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <div className='event-input'>
                        <TextField
                            id="image"
                            type='file' 
                            aria-describedby="image" 
                            // value={image} 
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DemoContainer components={['DatePicker', 'DatePicker','TimePicker', 'TimePicker']}>
                            <div className='datetime-input'>
                                <DatePicker
                                    label="Start Date"
                                    required
                                    minDate={dayjs()}
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    label="End Date"
                                    minDate={dayjs()}
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    dateFormat="dd/MM/yyyy"
                                    InputLabelProps={{ shrink: true }}  
                                />
                            </div>
                            <div className='datetime-input'>
                                <TimePicker
                                    label="Start Time"
                                    required
                                    minTime={dayjs()}
                                    value={startTime}
                                    onChange={(newValue) => setStartTime(newValue)}
                                    timeFormat = 'HH:MM'
                                />
                                <TimePicker
                                    label="End Time"
                                    minTime={dayjs()}
                                    value={endTime}
                                    onChange={(newValue) => setEndtime(newValue)}
                                    timeFormat = 'HH:MM'
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>

                    <div className='event-input'>
                        <TextField
                            id="Location"
                            required
                            label="Location"
                            name='Location'  
                            aria-describedby="location" 
                            value={location} 
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </div>

                    <Button className='button' onClick={handleClick}>
                        <img src={require("../public/images/add_icon.png")} alt="" /><p>add</p>
                    </Button>
                    
                </FormControl>
            </div>
        </div>
    );
}
export default AddEvent;