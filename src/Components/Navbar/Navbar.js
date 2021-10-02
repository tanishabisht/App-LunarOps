import { NavLink, Route } from 'react-router-dom'
import classes from './Navbar.module.css'
import { useLocation, useHistory } from 'react-router-dom'
import { auth } from '../../Config/firebase'
import { signOut } from "firebase/auth";


const Navbar = () => {
    const location = useLocation()
    const history = useHistory()
    const isMenu = location.pathname==='/networks' ? false : true

    const onSignOut = () => {
        signOut(auth).then(() => {
            history.push('/login')
            console.log('Successful sign out')
        }).catch(() => {
            console.log('Couldnt sign out')
        });
    }
    
    return (
        <div className={classes.Container}>
            <div style={isMenu===true ? null : {visibility:'hidden'}}>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/networks">SEE ALL NETWORKS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/my_logs">MY LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/network_logs">NETWORK LOGS</NavLink>
                {/* <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/topic_logs">TOPIC LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/picture_logs">PICTURE LOGS</NavLink> */}
            </div>
            <div>
                <button className={classes.Username}>TANISHA BISHT</button>
                <form><button className={classes.Item} onClick={onSignOut}>Logout</button></form>                
            </div>
        </div>
    );
}

export default Navbar;