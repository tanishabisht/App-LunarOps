import { useState, useEffect } from 'react'
import { NetworkCard } from '../../Components'
import classes from './AllNetworks.module.css'

import { doc, onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../Config/firebase'


const AllNetworks = () => {

    const funct = () => {
        const unsub = onSnapshot(collection(db, "network"), (snap) => {
            console.log(snap.docs.map(doc => doc.data()));
        })
        return () => unsub()
    }


    useEffect(funct, [])
    

    const allNetworksVar = [
        'FINE NAMEE 1',
        'NETWORK NAME 2',
        'NETWORK FIND 3',
        'NETWORK NAME 4',
        'NETWORK NAMEE 5',
        'NETWORK NAME 6',
        'NETWORK NAMEE 7',
        'NETWORK NAME 8',
        'NETWORK NAME 9'
    ]

    const [allNetworks, setAllNetworks] = useState(allNetworksVar)
    const [newNetwork, setNewNetwork] = useState(allNetworksVar)
    const [searchString, setSearchString] = useState('')

    const onSearchChange = e => setSearchString(e.target.value.trim().toLowerCase())
    const onNetworkChange = e => setNewNetwork(e.target.value)

    return (
        <div className={classes.Container}>

            {/* ADD NETWORK */}
            <input type="text" name="network_name" className={classes.AddInput} onChange={onNetworkChange} placeholder='Add a new network' />
            <button className={classes.AddBtn}>ADD</button>
            
            {/* SEARCH NETWORK */}
            <input type="text" name="network_name" className={classes.Input} onChange={onSearchChange} placeholder='Name of the network you want to find' />

            {/* NETWORK CARD LIST */}
            {allNetworks.filter(net =>  net.toLowerCase().match(searchString)).map(c => {
                return <NetworkCard key={c} name={c} />
            })}

        </div>
    );
}

export default AllNetworks;