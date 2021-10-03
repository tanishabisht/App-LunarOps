import { useState, useEffect } from 'react'
import { Log, OutputCard } from '../../Components'
import classes from './SingleNetwork.module.css'
import { doc, onSnapshot, collection, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from '../../Config/firebase'
import datetimeFormat from '../../Utilities/datetime'
import { useLocation } from 'react-router-dom'


const output = 'This is Apollo/Saturn Launch Control. Were inApollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am Apollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. WeApollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15amre awakended ... just about an hour ago, at 4:15am'


const NetworkLogs = () => {

    const location = useLocation()
    const networkName = location.pathname.split('/')[1]

    const [allLogs, setAllLogs] = useState([])

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
    }
    const onTypeChange = e => setType(e.target.value)
    const onMssgChange = e => setMssg(e.target.value)

    const mssgssgs = [
        'img elements must have an alt prop, either with meaningful text, or an empty string',
        'img elements must have an alt prop, either with meaningful text, or an empty string',
        'img elements must have an alt prop, either with meaningful text, or an empty string',
        'img elements must have an alt prop, either with meaningful text, or an empty string',
        'img elements must have an alt prop, either with meaningful text, or an empty string',
    ]


    return (
        <div className={classes.Container}>

            <div className={classes.FirstContainer}>
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
                    <p>{mssgssgs.map(m => <OutputCard mssg={m} />)}</p>
                </div>
            </div>
           
        </div>
    );
}

export default NetworkLogs;