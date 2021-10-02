import classes from './Log.module.css'


const Log = ({info, updateLog, user}) => {
    const { Message, SendBy, MessageType, Timestamp } = info
    var permanent = false
    if(MessageType==='/OFFICIAL') permanent = true 
    return (
        <div className={`${classes.Container} ${permanent && classes.PermContainer}`}>
            <div className={classes.Date}>
                <p>{Timestamp}</p>
                <p>{SendBy}</p>
                {MessageType==='/LOG' && SendBy===user && <span onClick={() => updateLog(Message, MessageType, Timestamp)}><i class="fas fa-edit"></i></span>}
            </div>
            <p className={classes.Text}>{Message}</p>
        </div>
    );
}

export default Log;