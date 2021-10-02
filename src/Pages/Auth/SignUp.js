// import classes from './Auth.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { Redirect } from "react-router";
import { auth } from "../../Config/firebase";
import { AuthContext } from "../../Config/auth";

const SignUp = () => {

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, 'user1@gmail.com', 'Welcome1')
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
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
            <h1>Sign Up</h1>
            <form>
                <label>Email<input name="email" type="email" placeholder="Email" /></label>
                <label>Password<input name="password" type="password" placeholder="Password" /></label>
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;