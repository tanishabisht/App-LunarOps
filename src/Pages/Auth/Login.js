import classes from './Auth.module.css'

import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Redirect } from "react-router";
import { auth } from "../../Config/firebase";
import { AuthContext } from "../../Config/auth";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secret, setSecret] = useState('')
    
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(secret === 'ganpatibappamourya') {
                console.log(email, user, password, secret)
                return <Redirect to="/" />;
            }
            console.log('wrong secret')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }    


    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.Container}>

            <div className={classes.About}>
                <div className={classes.Logo}></div>
                <div>
                    <div className={classes.Heading}>LUNAR OPS</div>
                    <div className={classes.SubHeading1}>A real-time collaboratory logs keeper</div>
                    <div className={classes.SubHeading2}>An application that can immediately and seamlessly integrate console log information of many users.</div>
                </div>
            </div>

            <div className={classes.Active}>
                <h1>Log in</h1>
                <form>
                    <input name="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input name="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <input name="secret" type="password" placeholder="Secret Key" onChange={e => setSecret(e.target.value)} />
                    <button className={classes.Btn} onClick={handleLogin}>Log in</button>
                </form>
            </div>
            
        </div>
    );
};

export default Login;