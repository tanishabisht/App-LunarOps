// import classes from './Auth.module.css'

import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { Redirect } from "react-router";
import { auth } from "../../Config/firebase";
import { AuthContext } from "../../Config/auth";

const Login = () => {

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, 'user1@gmail.com', 'Welcome1')
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            return <Redirect to="/" />;
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
        <div>
            <h1>Log in</h1>
            <form>
                <label>Email<input name="email" type="email" placeholder="Email" /></label>
                <label>Password<input name="password" type="password" placeholder="Password" /></label>
                <label>Secret Key<input name="secret" type="password" placeholder="Secret Key" /></label>
                <button onClick={handleLogin}>Log in</button>
            </form>
        </div>
    );
};

export default Login;