// import classes from './SingleNetwork.module.css'


// const PicLogs = () => {
//     return (
//         <div className={classes.Container}>
//             Picture Logs PAGE
//         </div>
//     );
// }

// export default PicLogs;




import { useState, useEffect } from 'react'
import { Log } from '../../Components'
import classes from './SingleNetwork.module.css'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../Config/firebase'


const OfficialLogs = () => {

    const [offLogs, setOffLogs] = useState([])

    const getRealtimeData = () => {
        console.log('offLogsVar', 'skjhdfksjdfhksjdfh')
        const unsub = onSnapshot(collection(db, 'Networks', "Test Network", 'Main Logs'), (snap) => {
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