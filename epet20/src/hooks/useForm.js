import { useState } from 'react'

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const reset = (values) => setValues(values);
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    return { reset, handleChange, values };

}
