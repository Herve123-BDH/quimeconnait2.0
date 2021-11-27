import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../features/userSlice';
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
export const Navba = () => {
  const [collapse, setCollapse]=useState(true)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const logou=(e)=>{
    dispatch(logout()) 
  }
    return (
        <div className="nav-app">
            <nav style={{flexDirection: collapse==true? "row": "column"}} className="navbar navbar-expand-lg">
              <div className="navv" style={{display: collapse==true? "flex": "flex", justifyContent:"space-between", alignItems:"center", width:collapse==true?"": "100%"}}>
              <a  className="navbar-brand active" href="#">Qui me connait?</a>
              <button onClick={()=>setCollapse(!collapse)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faAlignJustify}/>
              </button>
              </div>
            <div className={collapse==true? "collapse navbar-collapse" : ""} id="navbarSupportedContent">
              <ul style={{flexDirection: collapse===true?"row" : "row"}} className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                <label>Accueil</label>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link" to="/">
                      <label onClick={(e)=>logou(e)}>se deconnecter</label>
                    </Link>
                </li>
                <li className="nav-item">
                <Link  className="nav-link" to="/about">
                  A propos
                </Link>
                </li>
                <li className="nav-item">
                <label id="compte">{user.name}</label>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    )
}


