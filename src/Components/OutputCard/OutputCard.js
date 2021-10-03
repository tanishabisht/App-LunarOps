import classes from './OutputCard.module.css'


const OutputCard = ({mssg}) => {
    return (
        <div className={classes.Container}>
            <p className={classes.Text}>{mssg}</p>
        </div>
    );
}

export default OutputCard;