import './Amr.css'
import { useState } from 'react'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import start from './start.png'
import Next from './Next.png'
import Finish from './Finish.png'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {PlayInfo} from '../features/PlaySlice'
import { userSlice } from '../features/userSlice';
export const PlayAmrx = () => {
    const Question=[
        {
            question: "Quelle est ma couleur preferée?",
            reponse: ["Bleu", "Rose", "Blanc", "Noir"],
            url: null
        },
        {
            question: "quel est mon pays de reve?",
            reponse: ["USA", "France", "Angleterre", "Canada"],
            url: ["https://static.toiimg.com/photo/77757963.cms", "https://www.commonwealthfund.org/sites/default/files/styles/countries_hero_desktop/public/country_image_France.jpg?h=007ba93e&itok=H8jdL-7p","https://www.alibabuy.com/photos/library/1500/10135.jpg", "https://immetis.com/wp-content/uploads/freshizer/987a910d2de4454e6a64f2c83396de5e_canada-day-5370627_1920-1920-1080-c-100.jpg"]
        },
        {
            question: "Combien j'ai pu avoir de relation amoureuse ?",
            reponse: ["1", "2", "plus de 2", "t'es l'unique"],
            url: null

        },
        {
            question: "Mon amour me rend heureux(se)?",
            reponse: ["Oui", "Non", "un peu", "de fois"],
            url: null

        },
        {
            question: "en quelle année vais je me marier ?",
            reponse: ["2022", "2026", "dans 10 ans", "je sais pas"],
            url: null
        },
        {
            question: "Qu’ai je ressenti quand tu m’as vue pour la première fois ?",
            reponse: ["Foudre", "Amoureux(se)", "rien", "degout"],
            url: null
        },
        {
            question: "Qu'est ce que j'aime dans une relation amoureuse ?",
            reponse: ["Sexe", "baiser", "Bonne soin", "Nourriture"],
            url: null

        },
        {
            question: "A quel âge suis je tombée amoureuse pour la première fois ?",
            reponse: ["moins de 18 ans", "plus de 18 ans", "jamais été amoureux", "18 ans"],
            url: null

        },
        {
            question: "Que aimerais je pour mon anniversaire?",
            reponse: ["un sac", "une chaussure", "un voyage", "de l'argent"],
            url: ["https://ae01.alicdn.com/kf/HTB1I.REsS8YBeNkSnb4q6yevFXar/Maternelle-b-b-gar-on-fille-sac-dos-mode-dessin-anim-mignon-Anti-perdu-b-b.jpg_Q90.jpg_.webp","https://cdn.julesjenn.com/photos/2019/10/baskets-lacets-cuir-blanc-beige-1.jpg?w=350&h=350&scale.option=fill&cw=350&ch=350&cx=center&cy=center","https://www.lemagducse.com/images/dossiers/historique/voyage-groupe-071647.jpg", "https://www.economie.org/wp-content/uploads/2019/08/argent.jpg"]
        },
        {
            question: "Quel est le pire souvenir avec mon ex ?",
            reponse: ["j'ai pas d'ex", "elle me frappe", "elle est mauvaise au lit", "Aucun souvenir"],
            url: null
        }
    ]
    const dispatch = useDispatch()
    // la reponse aux questions
    //les reponses doivent venir du serveur, donc j'ai mis les nombres au hasard pour l'essaie
    // const Finalreponse=[2,4,1,4,2,1,3,1,3,2]
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
            axios.get(`https://quimeconnait.heroku.com/user/get/amrx/${id}`)
                    .then(response=>{
                        setFinalreponse(response.data[response.data.length-1])
                        console.log(Finalreponse)
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
                {cool==Question.length-1?<Link to='/dashboard/welldone'><img style={{cursor: "pointer", width: "120px"}} onClick={()=>{
                    console.log(pro)
                    axios.post(`https://quimeconnait.heroku.com/user/amrx/${id}`,{friendAmrx:{name: user, score: pro}})
                    .then(data=>data)
                    .catch(err=>console.log(err))
                    // setPro(100)
                    setTimeout(() => {
                        setOk(0)
                    }, 2000);
                    dispatch(PlayInfo({
                        player: user,
                        score: pro,
                        id: id,
                    }))
                    
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
                <input type="email" className="form-control" value={user} onChange={(e)=>setUser(e.target.value)} placeholder="entrez un nom d'utilisateur..." aria-label="Email" aria-describedby="basic-addon1"/>
                </div>
                    <button onClick={begin}  className="ui inverted button" >Jouer</button>
            </div>}
        </div>
    )
}