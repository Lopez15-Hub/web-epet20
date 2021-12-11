import { useState } from 'react'

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const reset = () => setValues(initialValues);
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    return { reset, handleChange, values }

}
