import classes from './Auth.module.css'


// const Login = () => {
//     return (
//         <div className={classes.Container}>
//             Login PAGE
//         </div>
//     );
// }

// export default Login;




import { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { db } from "../../Config/firebase";
import { AuthContext } from "../../Config/auth";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await db
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
            <label>
            Email
            <input name="email" type="email" placeholder="Email" />
            </label>
            <label>
            Password
            <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit">Log in</button>
        </form>
        </div>
    );
};

export default withRouter(Login);