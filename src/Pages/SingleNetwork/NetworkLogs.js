import { useState, useEffect } from 'react'
import { Log, OutputCard } from '../../Components'
import classes from './SingleNetwork.module.css'
import { doc, onSnapshot, collection, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from '../../Config/firebase'
import datetimeFormat from '../../Utilities/datetime'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const NetworkLogs = () => {

    const location = useLocation()
    const networkName = location.pathname.split('/')[1]

    const [allLogs, setAllLogs] = useState([])
    const [outputLogs, setOutputLogs] = useState([])

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [mssg, setMssg] = useState('')

    const [isUpdate, setIsUpdate] = useState(false)
    const [date, setDate] = useState('')



    const getRealtimeData = () => {
        const unsub = onSnapshot(collection(db, 'Networks', networkName, 'Main Logs'), (snap) => {
            const allLogsVar = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setAllLogs(allLogsVar.filter(log => log.MessageType!=='/IMAGES'))
        })
        return () => unsub()
    }
    const getOutputLogs = () => {
        const unsub = onSnapshot(collection(db, 'Networks', networkName, 'Output Logs'), (snap) => {
            const allLogsVar = snap.docs.map(doc => (doc.data().Message));
            setOutputLogs(allLogsVar)
        })
        return () => unsub()
    }
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
    useEffect(getRealtimeData, [])  
    useEffect(getOutputLogs, [])  
    useEffect(getUser, [])  



    const addLog = async() => {
        const docData = {
            Message: mssg,
            SendBy: name,
            MessageType: type,
            Timestamp: datetimeFormat(new Date())
        }
        const docRef = doc(db, "Networks", networkName, "Main Logs", `${docData.Timestamp}_${name}`);
        await setDoc(docRef, docData);
        axios.post(`https://nshlog.herokuapp.com/web-out-log/${networkName}/${docData.Timestamp}_${name}`)
        setType('')
        setMssg('')
    }
    const updateLog = async(mssg_var, type_var, date_var) => {
        setMssg(mssg_var)
        setType(type_var)
        setDate(date_var)
        setIsUpdate(true)
    }
    const updateLogHandler = async() => {
        setIsUpdate(false)
        const docData = {
            Message: mssg,
            MessageType: + type
        }
        const docRef = doc(db, "Networks", networkName, "Main Logs", `${date}_${name}`);
        await setDoc(docRef, docData, {merge:true});
        setType('')
        setMssg('')
    }
    const onTypeChange = e => setType(e.target.value)
    const onMssgChange = e => setMssg(e.target.value)


    return (
        <div className={classes.Container}>

            <div className={classes.FirstContainer} style={{flex:'2'}}>
                <div className={classes.LogsContainer}>
                    {allLogs.map(e => <Log info={e} updateLog={updateLog} user={name} />)}
                </div>
                <input value={type} onChange={onTypeChange} type="text" name="type" className={classes.Input} style={{width:'10%'}} placeholder='Type' />
                <input value={mssg} onChange={onMssgChange} type="text" name="text" className={classes.Input} style={{width:'80%'}} placeholder='Enter your log' />
                {isUpdate && <button className={classes.Btn} style={{width:'10%'}} onClick={updateLogHandler}>UPDATE</button>}
                {!isUpdate && <button className={classes.Btn} style={{width:'10%'}} onClick={addLog}>ADD</button>}
            </div>

            <div className={classes.SecondContainer}>
                <div className={classes.AllOutputContainer}>
                    <h2>Output</h2>
                    <p>{outputLogs.map(m => <OutputCard mssg={m} />)}</p>
                </div>
            </div>
           
        </div>
    );
}

export default NetworkLogs;