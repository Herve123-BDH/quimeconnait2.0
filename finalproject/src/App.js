import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'
import {BrowserRouter, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";
// import { Navbar } from './Components/Navbar';
import { Menu } from './Components/menu/Menu';
import { NewAccount } from './Components/signin/NewAccount';
import { Navba } from './Components/navbar/Navba';
import { Login } from './Components/login/Login';
import { Dashboard } from './Components/dashboard/Dashboard';
import {Amr} from './Components/dashboard/amrx/Amr';
import {Amitier} from './Components/dashboard/amitier/Amitier';
import { JeuCree } from './Components/fin/Amoureux/JeuCree';
import {PlayAmitier} from "./Components/Play/PlayAmitier";
import {PlayAmrx} from "./Components/Play/PlayAmrx";
import { Welldone } from './Components/dashboard/welldone/welldone';
import { Done } from './Components/dashboard/welldone/well-done';
import {Amitier_link} from './Components/fin/Amitier/Amitier_link';
import { LogOut } from './Components/navbar/LogOut';
import {selectUser} from './Components/features/userSlice';
import { useSelector } from 'react-redux';
import {LoadPage} from './Components/dashboard/LoadPage'
import { Motdepasse } from './Components/login/Motdepasse';
import {About} from './Components/About'
function App() {
  const user = useSelector(selectUser)
  return (
    <BrowserRouter>
      <Switch>
        <>
            <div className="App">
            {user? user.logit?<Route path="/" component={LogOut}/>: <Route path="/" component={Navba}/>:<Route path="/" component={LogOut}/>}
                <header className="App-header">
                
                <Route exact path="/" component={Menu}/>
                <Route path="/newaccount" component={NewAccount}/>
                <Route path="/login" component={Login}/>
                
                {user?user.logit? <Route path="/dashboard" component={Motdepasse}/>: <Route exact path="/dashboard" component={Dashboard}/>:<Route exact path="/dashboard" component={LoadPage}/>}
                <Route path="/dashboard/amoureux" component={Amr}/>
                <Route path="/dashboard/amitier" component={Amitier}/>
                {/* <Route path="/play" component={Play}/> */}
                <Route path="/PlayAmitier" component={PlayAmitier}/>
                <Route path="/PlayAmrx" component={PlayAmrx}/>
                <Route path="/dashboard/welldone" component={Welldone}/>
                <Route path="/dashboard/well-done" component={Done}/>
                <Route path="/dashboard/jeucree-amitier" component={Amitier_link}/>
                <Route exact path="/dashboard/jeucree" component={JeuCree}/>
                <Route exact path="/about" component={About}/>
                </header>
                
            </div>
          </>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
