import {useSelector} from 'react-redux';
import {selectUser} from '../features/userSlice';
import { useDispatch } from 'react-redux'
import {useState} from 'react'
import {Link} from 'react-router-dom'
export const LoadPage = () => {
    const [redirect, setredirect] = useState("")
    const user = useSelector(selectUser)
    const check=()=>{
        if(user===null){
            setInterval(() => {
                setredirect("mot de pass incorrect")
            }, 3000);
        }
    }
    check()
    return (
        <div>
            {redirect==="mot de pass incorrect"?
            <div style={{display: "flex", flexDirection:"column", padding:"25px", borderRadius:"15px", border:"2px solid #fff"}}>
                <label style={{margin:"5px", backgroundColor: "rgb(255 0 0 / 29%)", padding: "25px", borderRadius:"5px"}}>Mot de passe ou nom d'utilisateur incorrect</label>
                {/* <p className></p> */}
                <Link to="/login">
                <button style={{margin:"5px"}} className="ui inverted button" >se reconnecter</button>
                </Link>
                <Link to="/newaccount">
                <button style={{margin:"5px"}} className="ui inverted button" >creer un compte</button>                
                </Link>
            </div>:
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>}
        </div>
    )
}
