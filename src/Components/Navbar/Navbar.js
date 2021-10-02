import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
import { useLocation } from 'react-router-dom'
import {db} from '../../Config/firebase'


const Navbar = () => {
    const location = useLocation()
    const isMenu = location.pathname==='/networks' ? false : true

    const onSignOut = () => {
        db.auth().signOut()
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
                <button className={classes.Item} onChange={onSignOut}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;