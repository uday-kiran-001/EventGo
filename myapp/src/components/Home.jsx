import Card from './Card';
import Header from './Header';
import carousel from '../public/images/carousel.png';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setEventList } from '../store/events/eventSlice';
import '../css/styles.css'


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



function Home() {

  const eventList = useSelector(state => state.eventList.events);
  const email = useSelector(state => state.userInfo.email);
  const dispatch = useDispatch();

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/'
    ).then(res=>{
      console.log(res.data);
      dispatch(setEventList(res.data.eventList));
    }).catch(e=>console.log(e))
  }, []);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className='home'>
      <div>
          <Header/>
      </div>

      <div className='carousel-img'>
          <img src={carousel} alt="" />
      </div>

      <h1>Browse Events</h1>

      { eventList ?
        (
          <div className='home-tabs'>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="All" {...a11yProps(0)} />
                  { email && <Tab label="Created by you" {...a11yProps(1)} />}
                  </Tabs>
              </Box>
              <CustomTabPanel value={tabValue} index={0}>
                  <div className='event-list'>
                      
                      {eventList.map(event => {
                          return(
                              <Card 
                                  key={event.id}
                                  event={event}
                              />
                          );
                      })}
                  </div>
              </CustomTabPanel>
              {
                email && 
                <CustomTabPanel value={tabValue} index={1}>
                  <div className='event-list'>

                    {eventList.filter(event => event.creator === email).map(event => (
                      <Card 
                        key={event.id}
                        event={event}
                      />
                    ))}

                  </div>
                </CustomTabPanel>
              }
            </Box>
          </div>
        ) :
        (
          <div>Loading...</div>
        )
      }
      
    </div>
  );
}

export default Home;
  