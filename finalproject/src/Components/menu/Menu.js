import React from 'react'
import './Menu.css'
import {Link} from "react-router-dom";
export const Menu = () => {
    return (
        <div className="menu-one">
            <h3>Jouer a <span className="brand">qui me connait?</span></h3>
            <Link to='/newaccount'>
                <button className="ui inverted button" >nouveau compte</button>
            </Link>
            
            <hr />
            <Link to='/login'>
                <button className="ui inverted button">Se connecter</button>
            </Link>
        </div>
    )
}
