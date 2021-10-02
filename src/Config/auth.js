import React, { useEffect, useState } from "react";
import {db, auth} from "./firebase";
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                setPending(true)
                // const uid = user.uid;
            }
        });
    }, []);

    // if(pending){
    //     return <>Loading...</>
    // }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};