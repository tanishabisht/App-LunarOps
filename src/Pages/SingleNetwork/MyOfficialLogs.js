import { useState, useEffect } from 'react'
import { Log } from '../../Components'
import classes from './SingleNetwork.module.css'
import { onSnapshot, collection } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from '../../Config/firebase'
import { useLocation } from 'react-router-dom'


const MyOfficialLogs = () => {

    const location = useLocation()
    const networkName = location.pathname.split('/')[1]

    const [myOffLogs, setMyOffLogs] = useState([])
    const [name, setName] = useState([])

    
    const getUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.email.split('@')[0])
                console.log(user.email.split('@')[0])
            } else {
                console.log('No user fetched')
            }
        });
    }
    const getRealtimeData = () => {
        console.log('offLogsVar', 'skjhdfksjdfhksjdfh')
        const unsub = onSnapshot(collection(db, 'Networks', networkName, 'Main Logs'), (snap) => {
            const allLogsVar = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
            const offLogsVar = allLogsVar.filter(log => ((log.MessageType==='/OFFICIAL') && (log.SendBy===name)))
            setMyOffLogs(offLogsVar)
            console.log('sssssssssssss', name, offLogsVar)
        })
        return () => unsub()
    }
    useEffect(getUser, [])  
    useEffect(getRealtimeData, [])  


    return (
        <div className={classes.Container}>
            <div className={classes.FirstContainer}>
                <div className={classes.LogsContainer}>
                    {myOffLogs.map(e => <Log info={e} />)}
                </div>
            </div>
        </div>
    );
}

export default MyOfficialLogs;