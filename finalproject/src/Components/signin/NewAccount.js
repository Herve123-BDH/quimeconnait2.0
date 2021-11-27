import "./NewAccount.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { Link } from "react-router-dom"
import {validateEmail} from 'filter-validate-email'
import { login } from "../features/userSlice"
import { useDispatch } from "react-redux"
// import axios from 'axios'
import axios from 'axios'
export const NewAccount = () => {
    //show/hide mot de passe
    const[show, setShow]=useState(false)
    
    //mot de passe
    const[password, setPassword]=useState("")

    //confirmation mot de passe
    const[confirme, setConfirme]=useState('')

    //email
    const[email, setEmail]=useState("")

    //verification de email
    const[verifier, setVerifier]=useState(false)

    //nom d'utilisateur
    const[user, setUser]= useState("")

    //newaccount si un champs est manqué && /dashboard si success
    const[url, setUrl]=useState(false)

    //tout les erreurs
    const[all, setAll]=useState("")
    const dispatch = useDispatch()
    const[color, setColor]=useState("")
    //handler pour password
    const handleChangepassword=(e)=>{
        let password= e.target.value
        password= password.trim().replace(/[&\/\\#,+()$~%'":*?<>{};=]/g, '');
        setPassword(password)
        console.log(`password ${password}`);
        if(password.length<=4){
            setColor("red")
        }else if(5<=password.length && password.length<=7){
            setColor("yellow")
        }
        else{
            setColor("#0d6efd")
        }
    }

    //handler pour confirmation password
    const handleChangeconfirme=(e)=>{
        let confirme= e.target.value
        confirme= confirme.trim().replace(/[&\/\\#,+()$~%'":*?<>{};=]/g, '');
        setConfirme(confirme)
        console.log(`password ${confirme}`);
    }

    //handler pour email
    const handleChangeemail=(e)=>{
        let email=e.target.value
        setEmail(email)
        const result = validateEmail(email, false)
        setVerifier(result)
        console.log(verifier);
    }

    //handler pour nom d'utilisateur
        const handleChange=(e)=>{
        let user= e.target.value
        user= user.trim().replace(/[&\/\\#,+()$~%'":*?<>{};=]/g, '');
        setUser(user)
        console.log(`email ${user}`);
    }
    

    //bouton se connecter
    const submit=()=>{
        
        //si tous les champs sont pas remplis
        if(password==="" || user==="" || email===""){
            let a="remplissez tous les champs s'il vous plait"
            setAll(a)
        }
        //si les mot de passes sont differents
        else if(password!==confirme){
            let a= "mot de passe different, veillez retaper"
            setAll(a)
        }
        // si le email est invalide
        else if(verifier===false){
            let a="Email invalide"
            setAll(a)
        }
        //si le mot de passe est court
        else if(confirme.length<4){
            let a= "mot de passe trop court"
            setAll(a)
        }
        //si tout est bon, on envoi la forme au serveur
        else{
            // axios.post("https://localhost:5000/dashboard")
            // const newUser={
            //     username: user,
            //     email: email,
            //     password: confirme
            // 
            
            axios.post("https://quimeconnait.heroku.com/user/register", {
                nom: user,
                email: email,
                password: confirme})
                console.log('axios is executed');
            // console.log(user, email, confirme)
            
            dispatch(login({
                name: user,
                email: email,
                loggedIn: true
            }))
            setUrl(!url)
        }
    }

    return (
        <div>
            {/* afficher erreur s'il y'a  */}
            {all===""? "": <div style={{fontSize:"16px", padding:"0", marginBottom:"20px", display:"flex", justifyContent:"space-between", alignItems:"center"}} className="alert alert-danger"><p style={{paddingTop:"10px"}}>{all}</p><FontAwesomeIcon onClick={()=>setAll("")} style={{cursor:"pointer", margin: "5px"}} icon={faTimesCircle}></FontAwesomeIcon></div>}
            <form action={all ===""? "/dashboard" : ""} className="form-group form-app">
                <input type="text" className="form-control mb-3" value={user} onChange={handleChange} placeholder="Nom d'utilisateur"/>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="email" class="form-control" value={email} onChange={handleChangeemail} placeholder="Votre email" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <FontAwesomeIcon onClick={()=>setShow(!show)} className="showtext"  icon={show===true? faEye : faEyeSlash}/>
                    </div>
                    <input onChange={handleChangepassword} type={show===true? "text": "password"} value={password} className="form-control mb-3"  placeholder="confirmer mot de passe" />
                    <div class="progress" style={{width:"100%", height: "5px"}}>
                    <div class="progress-bar" role="progressbar"  style={{width: password.length+"0%", backgroundColor: color}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                </div>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <FontAwesomeIcon onClick={()=>setShow(!show)} className="showtext"  icon={show===true? faEye : faEyeSlash}/>
                    </div>
                    <input onChange={handleChangeconfirme} type={show===true? "text": "password"} value={confirme} className="form-control mb-3"  placeholder="mot de passe" />
                </div>
                <Link to ='/dashboard'>
                <button onClick={submit}  className="ui inverted button" >creer un compte</button>
                </Link>
            </form>
        </div>
    )
}
