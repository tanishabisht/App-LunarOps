import classes from './Log.module.css'


const ImgLog = ({info, onClick}) => {
    return (
        <div className={classes.GalleryImgContainer} onClick={() => onClick(info.Timestamp)}>
            <img className={classes.GalleryImg} src={info.Message} />
        </div>
    );
}

export default ImgLog;