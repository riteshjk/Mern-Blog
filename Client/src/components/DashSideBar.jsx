import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiUser,HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

const DashSideBar = () => {
    const [tab,setTab] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.user)

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    },[location.search])

    const handleSignout = async () => {

        console.log("hi ritesh");
        try {
          const res = await fetch("/api/users/signout", {
            method: "POST",
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
            // navigate("/signin");
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
  <Sidebar className="w-full md:w-56">
    <Sidebar.Items >
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to="/dashboard?tab=profile">
            <Sidebar.Item  active={tab=="profile"} icon={HiUser} label={currentUser.isAdmin ? "Admin" : "User"} as="div"> 
               Profile
            </Sidebar.Item>
            </Link>
            {
              currentUser.isAdmin &&  <Link to="/dashboard?tab=posts">
              <Sidebar.Item  active={tab=="posts"} icon={HiDocumentText} > 
                 Posts
              </Sidebar.Item>
              </Link>
            }
           
            <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}> 
               Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSideBar
