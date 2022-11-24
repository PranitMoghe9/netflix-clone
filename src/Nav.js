import React, { useEffect, useState } from 'react'
import './Nav.css'


function Nav() {
    const [show,SetShow]=useState(false)

    useEffect(()=>{
        function handleShow(){
        if(window.scrollY>100){
            SetShow(true)
        }else SetShow(false)
       }
       window.addEventListener("scroll", handleShow);
       return () => {
        window.removeEventListener("scroll", handleShow);
      };
    },[])

  return (
    <div className={`nav ${show && "nav__black"}`}>  {/*always show nav class buut if show is true then also add nav_black class*/}
        <img
        className='nav__logo'
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix-logo"></img>
        <img className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'alt='Profile Avatar'>
        </img>
    </div>
  )
}

export default Nav

//for images to ne reduced in size and keep aspect ratio use object-fit contain