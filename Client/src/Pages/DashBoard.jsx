import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';


const DashBoard = () => {
  const location = useLocation();
  const [tab,setTab] = useState("")
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div>
    <DashSideBar />
    </div>
    <div>
      {tab === "profile" && <DashProfile/> }
    </div>
    </div>
  )
}

export default DashBoard

