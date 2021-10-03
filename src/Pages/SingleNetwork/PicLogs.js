import { useState, useEffect } from 'react'
import { ImgLog } from '../../Components'
import classes from './SingleNetwork.module.css'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../Config/firebase'


const PicLogs = () => {

    // const imgs = [
    //     {Message: "https://media.wired.com/photos/5e961efdca6a5100098746f8/master/w_2560%2Cc_limit/space-human-body-backchhannel.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:54"},
    //     {Message: "https://keycdnmediado.apolloinrealtime.org/A11/images/NASA_photos/AS11-36-5369HR.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:55"},
    //     {Message: "https://keycdnmediado.apolloinrealtime.org/A11/images/NASA_photos/AS11-36-5382HR.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:56"},
    //     {Message: "https://media.wired.com/photos/5e961efdca6a5100098746f8/master/w_2560%2Cc_limit/space-human-body-backchhannel.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:57"},
    //     {Message: "https://media.wired.com/photos/5e961efdca6a5100098746f8/master/w_2560%2Cc_limit/space-human-body-backchhannel.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:58"},
    //     {Message: "https://media.wired.com/photos/5e961efdca6a5100098746f8/master/w_2560%2Cc_limit/space-human-body-backchhannel.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:59"},
    //     {Message: "https://media.wired.com/photos/5e961efdca6a5100098746f8/master/w_2560%2Cc_limit/space-human-body-backchhannel.jpg", MessageType: "/IMAGES", SendBy: "user2", Timestamp: "03-10-2021_05:30:50"},
    // ]

    const [imgLogs, setImgLogs] = useState([])

    const defaultImg = {
        Message: 'https://i.pinimg.com/736x/0b/40/b8/0b40b8b2396ad4d8ca889a06e03e31fa--cat-wallpaper-wallpaper-for-iphone.jpg',
        SendBy: 'who ever you like',
        Timestamp: 'anytime you like'
    }
    const [mainLog, setMainLog] = useState(defaultImg)

    const getRealtimeData = () => {
        const unsub = onSnapshot(collection(db, 'Networks', "Test Network", 'Main Logs'), (snap) => {
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