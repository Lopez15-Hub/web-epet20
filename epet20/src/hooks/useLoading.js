import { useState } from 'react'

export const UseLoading = () => {
    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [warning, setWarning] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const restartAlertsState = () => {
        setTimeout(() => {
            setError(false);
            setSuccess(false);
            setWarning(false);
            setLoading(false);
            setAlertMessage('');
        }, 3000)
    }
    return { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState }
}
