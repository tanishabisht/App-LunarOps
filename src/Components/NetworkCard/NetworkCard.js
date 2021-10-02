import classes from './NetworkCard.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../Config/firebase'


const NetworkCard = ({name}) => {

    const deleteHandler = async() => {
        await deleteDoc(doc(db, "Networks", name))
    }

    
    return (
        <div className={classes.Container}>
            <p>{name}</p>
            <span onClick={deleteHandler}><i class="fa fa-trash-alt"></i></span>
        </div>
    );
}

export default NetworkCard;