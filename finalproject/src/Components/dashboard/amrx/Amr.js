import './Amrx.css'
import { useState } from 'react'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import start from '../../Play/start.png'
import Next from '../../Play/Next.png'
import Finish from '../../Play/Finish.png'
import axios from 'axios'
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/userSlice';

export const Amr = () => {
    const user = useSelector(selectUser)
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
    //remplir le progress bar
    const [pro, setPro]=useState(0)
    const[err, setErr]=useState("")
    //les nombres des questions
    const [question, setQuestion]= useState(0)
    return (
        <div className="amrqqq">
            {
                ok !=0 ? <div className="d-flex justify-content-center align-items-center flex-column">  
                 {err==""? "": <div style={{fontSize:"16px", padding:"0", marginBottom:"20px", display:"flex", justifyContent:"space-evenly", alignItems:"center"}} className="alert alert-danger"><p style={{paddingTop:"10px",}}>choisissez au moins une reponse</p><FontAwesomeIcon onClick={()=>setErr("")} style={{cursor:"pointer", margin: "5px"}} icon={faTimesCircle}></FontAwesomeIcon></div>}
                <div class="progress" style={{width:"250px"}}>
                    <div class="progress-bar" role="progressbar"  style={{width: pro+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{pro+"%"}</div>
                </div> 
                {/* question a etre posé */}
                <h3>Question: {Question[cool].question}</h3>

                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="d-flex justify-content-center align-items-center flex-wrap p-1">
                    {/* reponse une */}

                            {Question[cool].url !=null ? <img onClick={()=>{
                            if(styl1==1 && styl2==1 && styl3==1 && styl==1){
                                setStyl(0.2)
                                setQuestion(question+1)
                                SetAnswers([...answers, 1])
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl}} src={Question[cool].url[0]}/>:<button onClick={()=>{
                                if(classe== "alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe2=="alert alert-success reponse" && classe3=="alert alert-success reponse"){
                                    setClasse('alert alert-warning reponse')
                                    SetAnswers([...answers, 1])
                                    setQuestion(question+1)
                                }
                            }} className={classe}>
                                    {Question[cool].reponse[0]}</button>}
                    {/* fin question une */}

                    {/* reponse deux */}
                                {Question[cool].url !=null ? <img onClick={()=>{if( styl1==1 && styl==1 && styl2==1 && styl3==1){
                                setStyl1(0.2)
                                SetAnswers([...answers, 2])
                                setQuestion(question+1)
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px",opacity: styl1}} src={Question[cool].url[1]}/>:<button  onClick={()=>{
                                    if(classe1=="alert alert-success reponse" && classe3=="alert alert-success reponse"&& classe2=="alert alert-success reponse" && classe=="alert alert-success reponse"){
                                        setClasse1('alert alert-warning reponse')
                                        SetAnswers([...answers, 2])
                                        setQuestion(question+1)
                                    }
                                }} className={classe1}>
                                    {Question[cool].reponse[1]}</button>}
                        
                    </div>

                    {/* fin question deux */}
                        <h3 id="score">{question}/10</h3>
                    {/* reponse trois */}
                    <div className="d-flex justify-content-center align-items-center flex-wrap p-1">
                    {Question[cool].url !=null ? <img onClick={()=>{if(styl2==1 && styl1==1 && styl==1 && styl3==1){
                        setStyl2(0.2)
                        SetAnswers([...answers, 3])
                        setQuestion(question+1)
                    }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl2}} src={Question[cool].url[2]}/>:<button onClick={()=>{
                        if(classe2 =="alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe3=="alert alert-success reponse" && classe=="alert alert-success reponse"){
                            setClasse2('alert alert-warning reponse')
                            SetAnswers([...answers, 3])
                            setQuestion(question+1)
                        }
                    }} className={classe2}>
                            {Question[cool].reponse[2]}</button>}
                    {/* fin reponse trois */}

                    {/* reponse quatre */}
                        {Question[cool].url !=null ? <img onClick={()=>{if(styl3==1 && styl1==1 && styl2==1 && styl==1){
                                setStyl3(0.2)
                                SetAnswers([...answers, 4])
                                setQuestion(question+1)
                            }}} style={{width:"140px", cursor:"pointer", height:"80px", margin: "5px", opacity: styl3}} src={Question[cool].url[3]}/>:<button onClick={()=>{
                                if(classe3=="alert alert-success reponse" && classe1=="alert alert-success reponse"&& classe2=="alert alert-success reponse" && classe=="alert alert-success reponse"){
                                    setClasse3('alert alert-warning reponse')
                                    SetAnswers([...answers, 4])
                                    setQuestion(question+1)
                                }
                            }} className={classe3}>
                                    {Question[cool].reponse[3]}</button>}
                    </div>
                    {/* fin reponse quatre */}
                </div>
                {cool==Question.length-1?<Link to='/dashboard/jeucree'><img  style={{cursor: "pointer", width: "150px"}} src={Finish} onClick={()=>{
                    console.log(answers)
                    setPro(100)
                    setTimeout(() => {
                        setOk(0)
                    }, 2000);
                    axios.post(`https://quimeconnait.heroku.com/user/upd/${user.id}`, {responseAmrx: answers})
                    .then(response => response)
                    
                }}/></Link>:
                <img src={Next} style={{cursor: "pointer", width: "150px"}} onClick={()=>
                    {
                        if(cool<=Question.length){
                            let a ="alert alert-success reponse"
                            if(classe!=a || classe1!=a ||classe2!=a || classe3 != a || styl!=1 || styl1!=1 || styl2!=1 || styl3!=1){
                                setCool(cool+1)
                                //ramener les classes a leur valeur par defaut (ecrit)
                                setClasse('alert alert-success reponse')
                                setClasse1('alert alert-success reponse')
                                setClasse2('alert alert-success reponse')
                                setClasse3('alert alert-success reponse')
                                //ramener les styles a leur valeur par defaut (photo)
                                setStyl(1)
                                setStyl1(1)
                                setStyl2(1)
                                setStyl3(1)
                                //ajouter les pourcentage au progressbar
                                setPro(pro+10)
                                setErr("")
                            }else{
                                setErr("Err")
                            }
                                    
                            }
                    }
                    }/>}
                
                </div> : <img style={{cursor: "pointer", width: "200px"}} onClick={()=>{setOk(1)}} src={start} />
            }
            
        </div>
    )
}
