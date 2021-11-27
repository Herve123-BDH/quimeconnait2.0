import './Dashboard.css'
import { Link } from 'react-router-dom'
import {useState} from "react"
import {useSelector} from 'react-redux';
import {selectUser} from '../features/userSlice';
export const Dashboard = () => {
    const user = useSelector(selectUser)
    const[amoureux, setAmoureux] = useState(user.friendAmrx)
    const [amitiers, setAmitiers]= useState(user.friendAmitier)

    
    return (
        <div className="space">
            <h>jouer</h>
            <div className="tout">
                <div className="choix amrx">
                    <Link to='./dashboard/amoureux'>
                        <button className="btn btn-outline-success">Pour Amoureux</button>
                    </Link>
                </div>
                <div className="choix amitier">
                    <Link to='./dashboard/amitier'>
                        <button className="btn btn-outline-success">Pour Amitier</button>
                    </Link>
                </div>
            </div>
            <div className="jouer-t">
                <h2>liste des joeurs</h2>
                <div className="jouer">
                    <div className="amrxxx">
                        <h3>Pour Amoureux</h3>
                        <ul style={{display:"flex", justifyContent: "center",alignItems:"center"}}>
                            
                            
                        <table>
                            {amoureux?amoureux.map((amoureuxUniq)=>
                                <tr>
                                    <td>
                                        <li>{amoureuxUniq.name}</li>
                                    </td>
                                    <td>
                                        <div className="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: amoureuxUniq.score +  "%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{amoureuxUniq.score}%</div>
                                        </div>
                                    </td>
                                </tr>
                                ):"no user"}
                            
                            </table>
                        </ul>
                    </div>
                    <div className="amitierrr">
                        <h3>Pour amitier</h3>
                        <ul style={{display:"flex", justifyContent: "center",alignItems:"center"}}>
                            
                            
                            <table>
                                {amitiers? amitiers.map((amitier)=>
                                <tr>
                                    <td>
                                        <li>{amitier.name}</li>
                                    </td>
                                    <td>
                                        <div className="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: amitier.score +  "%"}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{amitier.score} %</div>
                                        </div>
                                    </td>
                                </tr>
                                ): "no user"}
                            
                            </table>
                        </ul>
                    </div>
                </div>
            </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </div>
    )
}
