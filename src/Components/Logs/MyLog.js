import classes from './Log.module.css'


const MyLog = ({date, mssg}) => {
    return (
        <div className={classes.Container}>
            <p className={classes.Date}>{date}</p>
            <p className={classes.Text}>{mssg}</p>
        </div>
    );
}

export default MyLog;