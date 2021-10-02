import classes from './Log.module.css'


const Log = ({date, mssg, author}) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Date}>
                <p>{date}</p>
                <p>{author}</p>                
            </div>
            <p className={classes.Text}>{mssg}</p>
        </div>
    );
}

export default Log;