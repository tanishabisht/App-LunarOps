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

    var [date,setDate] = useState(new Date());
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <div className={classes.Container}>

            <div className={classes.About}>
                <div className={classes.Logo}></div>
                <div>
                    <div className={classes.Heading}>LUNAR OPS</div>
                    <span className={classes.DateTimeStamp}>
                        <span>{date.toLocaleDateString()}</span>
                        <span>{date.toLocaleTimeString()}</span>
                    </span>
                </div>
            </div>

            <div style={isMenu===true ? null : {visibility:'hidden'}}>
                <NavLink activeClassName={classes.Active} className={classes.Item} to="/networks">See All Networks</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/my_logs`}>User Logs</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/all_logs`}>All Logs</NavLink>
                {/* <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/my_official_logs`}>My Official Logs</NavLink> */}
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/official_logs`}>Official Logs</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.Item} to={`/${networkName}/picture_logs`}>Picture Logs</NavLink>
            </div>

            <div style={{display:'flex', alignItems:'start'}}>
                <p className={classes.Username}>{name || 'Username'}</p>
                <form><button className={classes.LogoutBtn} onClick={onSignOut}>Logout</button></form>                
            </div>

        </div>
    );
}

export default Navbar;