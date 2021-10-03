import { useState, useEffect } from 'react'
import { Log } from '../../Components'
import classes from './SingleNetwork.module.css'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../Config/firebase'
import { useLocation } from 'react-router-dom'


const OfficialLogs = () => {

    const location = useLocation()
    const networkName = location.pathname.split('/')[1]

    const [offLogs, setOffLogs] = useState([])

    const getRealtimeData = () => {
        console.log('offLogsVar', 'skjhdfksjdfhksjdfh')
        const unsub = onSnapshot(collection(db, 'Networks', networkName, 'Main Logs'), (snap) => {
            const allLogsVar = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
            const offLogsVar = allLogsVar.filter(log => log.MessageType === '/OFFICIAL')
            setOffLogs(offLogsVar)
            console.log(offLogsVar, 'skjhdfksjdfhksjdfh')
        })
        return () => unsub()
    }
    useEffect(getRealtimeData, [])  


    return (
        <div className={classes.Container}>
            <div className={classes.FirstContainer}>
                <div className={classes.LogsContainer}>
                    {offLogs.map(e => <Log info={e} />)}
                </div>
            </div>
        </div>
    );
}

export default OfficialLogs;