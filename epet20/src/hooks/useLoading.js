import React, { useState } from 'react'

export const UseLoading = () => {
    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [warning, setWarning] = useState();
    const [alertMessage, setAlertMessage] = useState();
    return { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage }
}
