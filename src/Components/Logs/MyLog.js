import classes from './Log.module.css'


const MyLog = ({info, updateLog}) => {
    const { Message, MessageType, Timestamp } = info

    var permanent = false
    if(MessageType==='/OFFICIAL') permanent = true 

    return (
        <div className={`${classes.Container} ${permanent && classes.PermContainer}`}>
            <p className={classes.Date}>{Timestamp}</p>
            <p className={classes.Text}>{Message}</p>
            {MessageType==='/LOG' && <span onClick={() => updateLog(Message, MessageType, Timestamp)}><i class="fas fa-edit"></i></span>}
        </div>
    );
}

export default MyLog;