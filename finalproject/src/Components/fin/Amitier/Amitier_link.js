import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import "./Amitier_link.css"
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/userSlice';
export const Amitier_link = () => {
    const user = useSelector(selectUser)
    const [clicked, setClicked]=useState(false)
    const[url, setUrl]=useState(`Bonjour, viens jouer a qui me connait, je saurais la personne qui me connait le mieux au monde 😍😍😍 https://quimeconnait.herokuapp.com/PlayAmitier/${user.id}`)
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
            <p>jeu crée, envoyez le lien a vos amis pour qu'ils puissent devinner votre personnalité</p>
            {clicked===false?"":<p>lien copié</p>}
            </div>
            <div className="ui action input" style={{display:"flex", justifyContent: "center", alignItems:"center"}}>
                    <input type="text" value={url}/>
                    <button onClick={()=> {navigator.clipboard.writeText(url)
                                    setClicked(true)
                                    setTimeout(() => {
                                        setClicked(false)  
                                    }, 2000);
                    }} className="ui teal right labeled icon button">
                        <i className="copy icon"></i>
                        Copy
                    </button>
            </div>
        </div>
    )
}




