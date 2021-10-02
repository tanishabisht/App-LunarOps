import classes from './NetworkCard.module.css'


const NetworkCard = ({name}) => {
    return (
        <div className={classes.Container}>
            <p>{name}</p>
            <span>34</span>
        </div>
    );
}

export default NetworkCard;