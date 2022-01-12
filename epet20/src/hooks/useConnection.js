import React, { useEffect } from 'react'

export const useConnection = () => {
    const [connectionStatus, setConnectionStatus] = React.useState(true)
    useEffect(() => {
        getConnectionStatus();
    }, [])
    const getConnectionStatus = () => {

        setConnectionStatus(true)
    }
    return { connectionStatus }
}
