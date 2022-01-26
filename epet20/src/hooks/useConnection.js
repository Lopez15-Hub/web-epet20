import React, { useEffect } from 'react'

export const useConnection = () => {
    const [connectionStatus, setConnectionStatus] = React.useState(true)

    const getConnectionStatus = () => {

        setConnectionStatus(true)
    }
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getConnectionStatus();
        }
        return () => mounted = false;
    }, [connectionStatus,setConnectionStatus])
    return { connectionStatus }
}
