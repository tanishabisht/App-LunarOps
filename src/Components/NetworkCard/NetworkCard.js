import classes from './NetworkCard.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'


const NetworkCard = ({name}) => {

    const history = useHistory()

    const deleteHandler = async() => {
        await deleteDoc(doc(db, "Networks", name))
    }

    const onClickHandler = () => {
        history.push(`${name}/all_logs`)
    }

    
    return (
        <div className={classes.Container}>
            <p onClick={onClickHandler}>{name}</p>
            <span onClick={deleteHandler}><i class="fa fa-trash-alt"></i></span>
        </div>
    );
}

export default NetworkCard;