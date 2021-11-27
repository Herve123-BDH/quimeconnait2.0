import { useState } from "react";
import { Link } from "react-router-dom";
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'
import { login } from "../features/userSlice"
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import { logout } from '../features/userSlice'
// import axios from 'axios'
import axios from 'axios'

export const Motdepasse = () => {
    
    //show/hide mot de passe
    const[show, setShow]=useState(false)
    //nom d'utilisateur
    const[user, setUser]= useState("")
    //mot de passe
    const[password, setPassword]=useState("")
    //erreur User
    const [errUser, setErrUser]=useState("")
    //login si mot de passe/username error && /dashboard si success
    const[url, setUrl]=useState(false)
    //erreur mot de passe
    const [err, setErr]=useState("mot de passe ou email invalide")
    //handler pour nom d'utilisateur
    const [errEmail, setErrEmail]=useState("")
    const dispatch = useDispatch()
    const handleChange=(e)=>{
        let user= e.target.value
        user= user.trim().replace(/[&\/\\#,+()$~%'":*?<>{};=]/g, '');
        setUser(user)
        console.log(`email ${user}`);
    }
    //handler pour password
    const handleChangep=(e)=>{
        let password= e.target.value
        password= password.trim().replace(/[&\/\\#,+()$~%'":*?<>{};=]/g, '');
        setPassword(password)
        console.log(`password ${password}`);
    }
    const [direct, setDirect]=useState("/dashboad")
    const submit=()=>{
        console.log('clicked');
        if(password==="" || user===""){
            setErr("remplissez tous les champs s'il vous plait")
        }else{
            
            axios.post("https://quimeconnait.heroku.com/user/login", {email: user, password: password})
            .then(response => {
                if(response.data.user){
                    dispatch(login({
                        name: response.data.user,
                        loggedIn: true
                    }))
                    setUrl(!url)
                }else{
                    setDirect("/login")
                    setErr("mot de passe ou email invalide")
                }
                

                })
            
        }

    }
    const logou=()=>{
        dispatch(logout()) 
    }
    logou();
    return (
        <div>
            
            {err==""? "": <div style={{fontSize:"16px", padding:"0", marginBottom:"20px", display:"flex", justifyContent:"space-evenly", alignItems:"center"}} className="alert alert-danger"><p style={{paddingTop:"10px",}}>{err}</p><FontAwesomeIcon onClick={()=>setErr("")} style={{cursor:"pointer", margin: "5px"}} icon={faTimesCircle}></FontAwesomeIcon></div>}
            <form action="" className="form-group form-app">
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="email" className="form-control" value={user} onChange={handleChange} placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <FontAwesomeIcon onClick={()=>setShow(!show)} className="showtext"  icon={show===true? faEye : faEyeSlash}/>
                    </div>
                    <input onChange={handleChangep} type={show===true? "text": "password"} value={password} className="form-control mb-3" placeholder="mot de passe" />
                </div>
                {/* <Link to='/resetpassword' style={{fontSize:"16px", color:"#fff", textDecoration:"none", position:"relative", left:"35%"}}>mot de passe oublié?</Link> */}
                <Link to='/dashboard'>
                    <button onClick={submit}  className="ui inverted button" >se connecter</button>
                </Link>
            </form>
        </div>
    )
}