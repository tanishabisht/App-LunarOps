import { useState, useEffect } from 'react'
import { ImgLog } from '../../Components'
import classes from './SingleNetwork.module.css'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../Config/firebase'
import { useLocation } from 'react-router-dom'


const PicLogs = () => {

    const location = useLocation()
    const networkName = location.pathname.split('/')[1]



    const [imgLogs, setImgLogs] = useState([])

    const defaultImg = {
        Message: 'https://i.pinimg.com/736x/0b/40/b8/0b40b8b2396ad4d8ca889a06e03e31fa--cat-wallpaper-wallpaper-for-iphone.jpg',
        SendBy: 'who ever you like',
        Timestamp: 'anytime you like'
    }
    const [mainLog, setMainLog] = useState(defaultImg)

    const getRealtimeData = () => {
        const unsub = onSnapshot(collection(db, 'Networks', networkName, 'Main Logs'), (snap) => {
            const allLogsVar = snap.docs.map(doc => ({id: doc.id, ...doc.data()}))
            const imgLogsVar = allLogsVar.filter(log => log.MessageType === '/IMAGES')
            setImgLogs(imgLogsVar)
            console.log(imgLogsVar)
        })
        return () => unsub()
    }
    useEffect(getRealtimeData, [])

    const onImgClick = (date) => {
        console.log(imgLogs.find(e => e.Timestamp === date))
        setMainLog(imgLogs.find(e => e.Timestamp === date))
    }

    return (
        <div className={classes.Container}>
            <div className={classes.CenterContainer}>

                {/* ALL IMAGES */}
                <div className={classes.PhotoGallery}>
                    {imgLogs.map(i => <ImgLog info={i} onClick={onImgClick} />)}
                </div>
                
                {/* MAIN IMAGE */}
                <div className={classes.PhotoMain}>
                    <div className={classes.ImageContainer}>
                        <img src={mainLog.Message} />
                        <div className={classes.UserInfo}>
                            <p>SEND BY: {mainLog.SendBy}</p>
                            <p>DATE: {mainLog.Timestamp}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PicLogs;