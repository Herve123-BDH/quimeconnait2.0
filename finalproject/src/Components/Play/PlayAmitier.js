import { useState } from 'react'
import './Amitier.css'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import start from './start.png'
import Next from './Next.png'
import Finish from './Finish.png'
import axios from 'axios'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import {PlayInfo} from '../features/PlaySlice'
export const PlayAmitier = () => {
    const dispatch=useDispatch()
    const Question=[
        {
            question: "Où je me vois dans 5, 10 ou 15 ans ?",
            reponse: ["", "Rose", "Blanc", "Noir"],
            url: ["https://blog.publimaison.ca/wp-content/uploads/2015/02/shutterstock_193994486.jpg","https://www.leboncombat.fr/wp-content/uploads/2019/04/riche-morale-experiences-une.jpg","https://images.memphistours.com/xlarge/8436f05ade828ee5dd9f3c859583d030.jpg","https://www.fichemetier.fr/wp-content/uploads/2016/10/Diplome-etat-docteur-medecine.jpg"]
        },
        {
            question: "quel est mon pays de reve?",
            reponse: ["USA", "France", "Angleterre", "Canada"],
            url: ["https://static.toiimg.com/photo/77757963.cms", "https://www.commonwealthfund.org/sites/default/files/styles/countries_hero_desktop/public/country_image_France.jpg?h=007ba93e&itok=H8jdL-7p","https://www.alibabuy.com/photos/library/1500/10135.jpg", "https://immetis.com/wp-content/uploads/freshizer/987a910d2de4454e6a64f2c83396de5e_canada-day-5370627_1920-1920-1080-c-100.jpg"]
        },
        {
            question: "je viens de gagner 10 000€, que fairais je de cet argent ?",
            reponse: ["investir", "donner aux parents", "utiliser", "faire une fete"],
            url: null

        },
        {
            question: "Quelle langue étrangère voudrais-je apprendre ?",
            reponse: ["Anglais", "Chinois", "espagnole", "Arabe"],
            url: null

        },
        {
            question: "Quel super heroe voudrais-je devenir?",
            reponse: ["2022", "2026", "dans 10 ans", "je sais pas"],
            url: ["https://static.timesofisrael.com/www/uploads/2013/07/Comic-Con-Superman-A_Horo-e1374405660636-1024x640.jpg","https://tvline.com/wp-content/uploads/2020/04/flash-gustin-contract-talks.jpg?w=620", "https://dl.img-news.com/dl/img/s3/dl/2020/09/avengersrdj.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJ4r8Gwh_4xNz1EZKZ_D1QFkrKbNms5bVp51p_9Okg-riGcOI0Bj2N4SkUJZ-YoVAMgQ&usqp=CAU"]
        },
        {
            question: "Si je pouvais avoir un animal sauvage comme compagnon, lequel choisirais-je ?",
            reponse: ["Foudre", "Amoureux(se)", "rien", "degout"],
            url: ["https://www.akc.org/wp-content/uploads/2017/11/Shiba-Inu-standing-in-profile-outdoors.jpg","https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/4/2/c/42c15179b9_50148966_animal-non-domestique.jpg", "https://www.imagesdoc.com/wp-content/uploads/sites/33/2018/10/AdobeStock_60847915-e1540996326721.jpeg", "https://lemagdesanimaux.ouest-france.fr/images/dossiers/categories/animaux-sauvages-162902-650-400.jpg"]
        },
        {
            question: "Comment j'aime etre réconforté ?",
            reponse: ["conseiller", "argent", "histoire", "faire sortir"],
            url: null

        },
        {
            question: " c'est quoi mon passe temps sur internet",
            reponse: ["Papa", "amie", "Angleterre", "Canada"],
            url: ["https://comment-contacter.fr/wp-content/uploads/2021/02/comment-contacter-Instagram.jpg","https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg","https://static.independent.co.uk/2021/09/16/12/whatsapp%20update%20latest%20.jpg?width=640&auto=webp&quality=75", "data:image/png;base64,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"]

        },
        {
            question: "Que aimerais je pour mon anniversaire?",
            reponse: ["un sac", "une chaussure", "un voyage", "de l'argent"],
            url: ["https://ae01.alicdn.com/kf/HTB1I.REsS8YBeNkSnb4q6yevFXar/Maternelle-b-b-gar-on-fille-sac-dos-mode-dessin-anim-mignon-Anti-perdu-b-b.jpg_Q90.jpg_.webp","https://cdn.julesjenn.com/photos/2019/10/baskets-lacets-cuir-blanc-beige-1.jpg?w=350&h=350&scale.option=fill&cw=350&ch=350&cx=center&cy=center","https://www.lemagducse.com/images/dossiers/historique/voyage-groupe-071647.jpg", "https://www.economie.org/wp-content/uploads/2019/08/argent.jpg"]
        },
        {
            question: "Quel est mon talent caché ?",
            reponse: ["se souvient de tout", "rappeur", "informaticien", "dragueur"],
            url: null
        }
    ]
    // la reponse aux questions
    //les reponses doivent venir du serveur, donc j'ai mis les nombres au hasard pour l'essaie
    const [Finalreponse, setFinalreponse]=useState([])
    const[cool, setCool]=useState(0)
    const[ok, setOk]=useState(0)
    // const[last, setLast]=useState(0)
    const[answers, SetAnswers]=useState([])
//modifier les classes quand l'utilisateur clique sur une reponse ecrite
    const[classe, setClasse]=useState('alert alert-success reponse')
    const[classe1, setClasse1]=useState('alert alert-success reponse')
    const[classe2, setClasse2]=useState('alert alert-success reponse')
    const[classe3, setClasse3]=useState('alert alert-success reponse')
//modifier les styles quand l'utilisateur clique sur une reponse photo
    const[styl, setStyl]=useState(1)
    const[styl1, setStyl1]=useState(1)
    const[styl2, setStyl2]=useState(1)
    const[styl3, setStyl3]=useState(1)
    //remplir la bar de progression
    const [pro, setPro]=useState(0)
    // affiche toutes les erreur possible
    const[err, setErr]=useState("")
    //index des reponses
    const [b, setB]= useState(0)
    //la couleur de bordure des images si l'utilisateur a trouvé la question ou pas
    const [colorier, setColorier]=useState("")
    const [colorier1, setColorier1]=useState("")
    const [colorier2, setColorier2]=useState("")
    const [colorier3, setColorier3]=useState("")
    let paths=window.location.pathname;
    const id=paths.substring(paths.lastIndexOf('/') + 1)
    //savoir si le jouer a ecrit son nom ou pas
    const [profil, setProfil]= useState(false)
    const[user, setUser]= useState("")
    const[none, setNone]=useState("")
    //faire apparaitre le message erreur
    const [removed, setRemoved]=useState("none")
    const begin =()=>{
        if(user===""){
            setNone("veillez entrer un nom d'utilisateur")
        }else{
            axios.get(`https://quimeconnait.heroku.com/user/get/amitier/${id}`)
                    .then(response=>{
                        //setFinalreponse(response.data.reponse[response.data.length-1])
                        setFinalreponse(response.data.reponse[response.data.reponse.length-1])
                        dispatch(PlayInfo({
                            id: response.data.id,
                            friendAmitier: response.data.reponse[response.data.reponse.length-1],
                        }))
                    })
                    .catch(err=>console.error(err))
            setInterval(() => {
                setRemoved("block")
            }, 3000);
            setProfil(!profil)
            console.log(user)
        }
        
    }
    return (
        <div className="amr">
            
            {profil===true? Finalreponse.length===0?  
            <div>
                {removed==="none"?<div className="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>:""}
            <div style={{display: removed}}><p style={{fontSize:"30px"}}>Error 504</p><p>data not loaded, check your internet connection</p><a href={"/PlayAmitier/"+id}><button style={{margin:"5px"}} className="ui inverted button" >rafrechir</button></a></div>
            </div>:
            <div>
                {
                ok !=0 ? <div className="d-flex justify-content-center align-items-center flex-column">  
                {err==""? "": <div style={{fontSize:"16px", padding:"0", marginBottom:"20px", display:"flex", justifyContent:"space-evenly", alignItems:"center"}} className="alert alert-danger"><p style={{paddingTop:"10px",}}>choisissez au moins une reponse</p><FontAwesomeIcon onClick={()=>setErr("")} style={{cursor:"pointer", margin: "5px"}} icon={faTimesCircle}></FontAwesomeIcon></div>}
                
                {err===""? <div class="progress" style={{width:"250px"}}>
                    
                    <div class="progress-bar" role="progressbar"  style={{width: pro+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{pro+"%"}</div>
                </div>  : ""}
                {/* question a etre posé */}
                <h3>Question: {Question[cool].question}</h3>

                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="d-flex justify-content-center align-items-center flex-wrap p-1">
                    {/* reponse une */}

                            {Question[cool].url !=null ? <div style={{backgroundColor:colorier}}><img onClick={()=>{
                            if(styl1==1 && styl2==1 && styl3==1 && styl==1 && colorier==="" && colorier1==="" && colorier2==="" && colorier3===""){
                                
                                if(Finalreponse[b]===1){
                                    setColorier("green")
                                    setB(b+1)
                                    //ajouter les pourcentage au progressbar
                                    setPro(pro+10)
                                }else{
                                    setColorier("red")
                                    
                                    switch (Finalreponse[b]) {
                                        case 2:
                                            setColorier1("green")
                                            break;
                                        case 3:
                                            setColorier2("green")
                                            break;
                                        case 4:
                                            setColorier3("green")
                                            break;
                                    }
                                    setB(b+1)
                                }
                                SetAnswers([...answers, 1])
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl, }} src={Question[cool].url[0]}/></div>:<button onClick={()=>{
                                
                                if(classe== "alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe2=="alert alert-success reponse" && classe3=="alert alert-success reponse"){
                                    if(Finalreponse[b]===1){
                                        setClasse('alert alert-warning reponse')
                                        setB(b+1)
                                        //ajouter les pourcentage au progressbar
                                    setPro(pro+10)
                                    }else{
                                        setClasse('alert alert-danger reponse')
                                        switch (Finalreponse[b]) {
                                            case 2:
                                                setClasse1('alert alert-warning reponse')
                                                break;
                                            case 3:
                                                setClasse2('alert alert-warning reponse')
                                                break;
                                            case 4:
                                                setClasse3('alert alert-warning reponse')
                                                break;
                                        }
                                        setB(b+1)
                                    }
                                    
                                    // SetAnswers([...answers, 1])
                                }
                            }} className={classe}>
                                    {Question[cool].reponse[0]}</button>}
                    {/* fin question une */}

                    {/* reponse deux */}
                                {Question[cool].url !=null ? <div style={{backgroundColor:colorier1}}><img onClick={()=>{if(  styl1==1 && styl==1 && styl2==1 && styl3==1 && colorier1==="" && colorier3==="" && colorier2==="" && colorier===""){
                                if(Finalreponse[b]===2){
                                    setColorier1("green")
                                    setB(b+1)
                                    //ajouter les pourcentage au progressbar
                                    setPro(pro+10)
                                }else{
                                    setColorier1("red")
                                    switch (Finalreponse[b]) {
                                        case 1:
                                            setColorier("green")
                                            break;
                                        case 3:
                                            setColorier2("green")
                                            break;
                                        case 4:
                                            setColorier3("green")
                                            break;
                                    }
                                    setB(b+1)
                                }
                                
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px",opacity: styl1}} src={Question[cool].url[1]}/></div>:<button  onClick={()=>{
                                    if(classe1=="alert alert-success reponse" && classe3==="alert alert-success reponse"&& classe2==="alert alert-success reponse" && classe==="alert alert-success reponse"){
                                        if(Finalreponse[b]===2){
                                            setClasse1('alert alert-warning reponse')
                                            setB(b+1)
                                            //ajouter les pourcentage au progressbar
                                            setPro(pro+10)
                                        }else{
                                            setClasse1('alert alert-danger reponse')
                                            switch (Finalreponse[b]) {
                                                case 1:
                                                    setClasse('alert alert-warning reponse')
                                                    break;
                                                case 3:
                                                    setClasse2('alert alert-warning reponse')
                                                    break;
                                                case 4:
                                                    setClasse3('alert alert-warning reponse')
                                                    break;
                                            }
                                            setB(b+1)
                                        }
                                    }
                                }} className={classe1}>
                                    {Question[cool].reponse[1]}</button>}
                    </div>

                    {/* fin question deux */}

                    {/* reponse trois */}
                    <div className="d-flex justify-content-center align-items-center flex-wrap p-1">
                    {Question[cool].url !=null ? <div style={{backgroundColor:colorier2}}><img onClick={()=>{if(styl2===1 && styl1===1 && styl===1 && styl3===1 && colorier1==="" && colorier==="" && colorier3==="" && colorier2===""){
                        if(Finalreponse[b]===3){
                            setColorier2("green")
                            setB(b+1)
                            //ajouter les pourcentage au progressbar
                            setPro(pro+10)
                        }else{
                            setColorier2("red")
                            switch (Finalreponse[b]) {
                                case 2:
                                    setColorier1("green")
                                    break;
                                case 1:
                                    setColorier("green")
                                    break;
                                case 4:
                                    setColorier3("green")
                                    break;
                            }
                            setB(b+1)
                        }
                    }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl2}} src={Question[cool].url[2]}/></div>:<button onClick={()=>{
                        if(classe2 =="alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe3=="alert alert-success reponse" && classe=="alert alert-success reponse"){
                            if(Finalreponse[b]===3){
                                setClasse2('alert alert-warning reponse')
                                setB(b+1)
                                //ajouter les pourcentage au progressbar
                                setPro(pro+10)
                            }else{
                                setClasse2('alert alert-danger reponse')
                                switch (Finalreponse[b]) {
                                    case 2:
                                        setClasse1('alert alert-warning reponse')
                                        break;
                                    case 1:
                                        setClasse('alert alert-warning reponse')
                                        break;
                                    case 4:
                                        setClasse3('alert alert-warning reponse')
                                        break;
                                }
                                setB(b+1)
                            }
                        }
                    }} className={classe2}>
                            {Question[cool].reponse[2]}</button>}
                    {/* fin reponse trois */}

                    {/* reponse quatre */}
                        {Question[cool].url !=null ? <div style={{backgroundColor:colorier3}}><img onClick={()=>{if(styl3==1 && styl1==1 && styl2==1 && styl==1 && colorier==="" && colorier1==="" && colorier2===""){
                                if(Finalreponse[b]===4){
                                    setColorier3("green")
                                    setB(b+1)
                                    //ajouter les pourcentage au progressbar
                                    setPro(pro+10)
                                }else{
                                    setColorier3("red")
                                    switch (Finalreponse[b]) {
                                        case 2:
                                            setColorier1("green")
                                            break;
                                        case 3:
                                            setColorier2("green")
                                            break;
                                        case 1:
                                            setColorier("green")
                                            break;
                                    }
                                    setB(b+1)
                                }
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl3}} src={Question[cool].url[3]}/></div>:<button onClick={()=>{
                                if(classe3=="alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe2=="alert alert-success reponse" && classe=="alert alert-success reponse"){
                                    if(Finalreponse[b]===4){
                                        setClasse3('alert alert-warning reponse')
                                        setB(b+1)
                                        //ajouter les pourcentage au progressbar
                                        setPro(pro+10)
                                    }else{
                                        setClasse3('alert alert-danger reponse')
                                        switch (Finalreponse[b]) {
                                            case 2:
                                                setClasse1('alert alert-warning reponse')
                                                break;
                                            case 3:
                                                setClasse2('alert alert-warning reponse')
                                                break;
                                            case 1:
                                                setClasse('alert alert-warning reponse')
                                                break;
                                        }
                                        setB(b+1)
                                    }
                                }
                            }} className={classe3}>
                                    {Question[cool].reponse[3]}</button>}
                    </div>
                    {/* fin reponse quatre */}
                </div>
                {cool==Question.length-1?<Link to='/dashboard/well-done'><img style={{cursor: "pointer", width: "120px"}} onClick={()=>{
                    console.log(pro)
                    axios.post(`https://quimeconnait.heroku.com/user/amitier/${id}`,{friendAmitier:{name: user, score: pro}})
                    .then(data=>data)
                    .catch(err=>console.log(err))
                    // setPro(100)
                    setTimeout(() => {
                        setOk(0)
                    }, 2000);
                    
                }} src={Finish} /></Link>:
                <img src={Next} style={{cursor: "pointer", width: "150px"}} onClick={()=>
                    {
                        if(cool<=Question.length){
                            let a ="alert alert-success reponse"
                            if(classe!=a || classe1!=a ||classe2!=a || classe3 != a || colorier==="red" || colorier1==="red" ||  colorier2==="red" || colorier3==="red" || colorier!="" || colorier1!="" ||  colorier2!="" || colorier3!=""){
                                setCool(cool+1)
                                //ramener les classes a leur valeur par defaut (ecrit)
                                setClasse('alert alert-success reponse')
                                setClasse1('alert alert-success reponse')
                                setClasse2('alert alert-success reponse')
                                setClasse3('alert alert-success reponse')
                                //ramener les couleurs a leur place
                                setColorier("")
                                setColorier1("")
                                setColorier2("")
                                setColorier3("")
                                //ramener les styles a leur valeur par defaut (photo)
                                setColorier("")
                                setColorier1("")
                                setColorier2("")
                                setColorier3("")
                                console.log(Finalreponse)
                                setErr("")
                            }
                            else{
                                setErr("Err")
                            }
                        }
                    }
                    }/>}
                
                </div> :<img src={start} style={{cursor: "pointer", height: "200px"}} onClick={()=>{
                    
                    setOk(1)}}/>
            }
            
            </div>: 
            <div>
                {none===""? "": <div style={{fontSize:"16px", padding:"0", marginBottom:"20px", display:"flex", justifyContent:"space-evenly", alignItems:"center"}} className="alert alert-danger"><p style={{paddingTop:"10px",}}>saisissez votre nom d'utilisateur</p><FontAwesomeIcon onClick={()=>setNone("")} style={{cursor:"pointer", margin: "5px"}} icon={faTimesCircle}></FontAwesomeIcon></div>}
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" className="form-control" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="entrez un nom d'utilisateur..." aria-label="Email" aria-describedby="basic-addon1"/>
                </div>
                    <button onClick={begin}  className="ui inverted button" >Jouer</button>
            </div>}
        </div>
    )
}
