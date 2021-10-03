import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
import { useLocation, useHistory } from 'react-router-dom'
import { auth, getUser } from '../../Config/firebase'
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

            <div className={classes.About}>
                <div className={classes.Logo}></div>
                <div className={classes.Heading}>LUNAR OPS</div>
            </div>

            <div style={isMenu===true ? null : {visibility:'hidden'}}>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/networks">SEE ALL NETWORKS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/my_logs">MY LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/all_logs">ALL LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/my_official_logs">MY OFF LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/official_logs">OFF LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/network_name/picture_logs">PICTURE LOGS</NavLink>
            </div>

            <div style={{display:'flex', alignItems:'start'}}>
                <p className={classes.Username}>{getUser() || 'Username'}</p>
                <form><button className={classes.LogoutBtn} onClick={onSignOut}>Logout</button></form>                
            </div>

        </div>
    );
}

export default Navbar;