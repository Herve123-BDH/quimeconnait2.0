import {useState} from 'react'
import axios from 'axios'
import './welldone.css'
import item from '../img/item.png'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {PlayInfo} from '../../features/PlaySlice'
export const Welldone = () => {
    const player=useSelector(PlayInfo)
    const [id, setId]= useState(player.payload.playInfo.player===null? "":player.payload.playInfo.player.id)
    const [niveau, setNiveau]=useState(5)
    const [users, setUsers]=useState()
    const [username, setUserName]=useState("")
    const [none, setNone]=useState("block")
    const loading= async()=>{
        try{
            const go= await axios.get(`https://quimeconnait.heroku.com/user/get/listamrx/${id}`)
            .then(response=>{
                setUserName(response.data.nom)
                setUsers(response.data.amrx)
                // response.data.amitier.map(elt=>users.push(elt))
               // console.log(users)
            })
        }
        catch(err){
            console.log(err)
            setInterval(()=>{
                setNone("none")
            }, 5000)
        }
    }
    loading();
    return (
        <div>
            {users?<h2>liste des amoureux de {username}</h2>:""}
                
                    <div className="amrxxx">
                        <ul style={{display:"flex", justifyContent: "center",alignItems:"center"}}>
                        <table>
                            
                            {users?users.map((usersUniq)=>
                            <div>
                                <tr>
                                    <td style={{width: "30%"}}>
                                        <li>{usersUniq.name}</li>
                                        
                                    </td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: usersUniq.score +  "%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{usersUniq.score}%</div>
                                        </div>
                                    </td>
                                    
                                </tr>
                                
                            </div>
                                ):
                                
                                <div>
                                <div style={{display: none}} className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                
                                {none==="block"? "":<button onClick={loading}  className="ui inverted button" >rafrechir la page</button>}
                                </div>
                                }
                                
                        </table>
                    </ul>
                    {users?<Link to='/'><button onClick={loading}  className="ui inverted button" >Jouer</button></Link>:""}
                </div>
        </div>
    )
}
