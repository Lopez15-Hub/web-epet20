import React from 'react'

export const useDate = () => {
    const [date] = React.useState(new Date())
    const formatYear = () => {
        const formatDate = date.toLocaleString().substring(5, 9);
        return formatDate

    }
    const formatDate = (date) => {
        const formatDate = date.toLocaleString().substring(0, 10);
        return formatDate

    }
    return { formatDate, formatYear }
}
