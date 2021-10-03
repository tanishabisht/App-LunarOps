import classes from './Navbar.module.css'
import { useLocation, useHistory, NavLink } from 'react-router-dom'
import { auth } from '../../Config/firebase'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react'


const Navbar = () => {
    const location = useLocation()
    const history = useHistory()
    const isMenu = location.pathname==='/networks' ? false : true
    const networkName = location.pathname.split('/')[1]

    const onSignOut = () => {
        signOut(auth).then(() => {
            history.push('/login')
            console.log('Successful sign out')
        }).catch(() => {
            console.log('Couldnt sign out')
        });
    }

    const [name, setName] = useState('')
    // const getUserHandler = () => {
    //     onAuthStateChanged(auth, (user) => {
    //     if (user) setName(user.email.split('@')[0])
    //         else console.log('No user fetched') 
    //     });
    // }
    // useEffect(getUserHandler, [])

    return (
        <div className={classes.Container}>

            <div className={classes.About}>
                <div className={classes.Logo}></div>
                <div className={classes.Heading}>LUNAR OPS</div>
            </div>

            <div style={isMenu===true ? null : {visibility:'hidden'}}>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/networks">SEE ALL NETWORKS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/my_logs`}>MY LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/all_logs`}>ALL LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/my_official_logs`}>MY OFF LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/official_logs`}>OFF LOGS</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/picture_logs`}>PICTURE LOGS</NavLink>
            </div>

            <div style={{display:'flex', alignItems:'start'}}>
                <p className={classes.Username}>{name || 'Username'}</p>
                <form><button className={classes.LogoutBtn} onClick={onSignOut}>Logout</button></form>                
            </div>

        </div>
    );
}

export default Navbar;