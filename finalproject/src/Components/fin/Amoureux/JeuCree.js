import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import "./JeuCree.css"
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/userSlice';
export const JeuCree = () => {
    const user = useSelector(selectUser)
    const[url, setUrl]=useState(`Bonjour, viens jouer a qui me connait special amoureux, je saurais mon amoureux qui me connait le mieux 😍😍😍 http://localhost:3000/PlayAmrx/${user.id}`)
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
            <p>jeu crée, envoyez le lien a vos amis pour qu'ils puissent devinner votre personnalité</p>
            </div>
            <div className="ui action input" style={{display:"flex", justifyContent: "center", alignItems:"center"}}>
                    <input type="text" value={url}/>
                    <button onClick={()=> navigator.clipboard.writeText(url)} className="ui teal right labeled icon button">
                        <i className="copy icon"></i>
                        Copy
                    </button>
            </div>
        </div>
    )
}




