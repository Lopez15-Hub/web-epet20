import React from 'react'

export const useDate = (a, b) => {
    const [date] = React.useState(new Date())
    const formatYear = () => {
        const formatDate = date.toLocaleString().substring(5, 9);
        return formatDate

    }
    const formatDate = () => {
        const formatDate = date.toLocaleString().substring(0, 10);
        return formatDate

    }
    return { formatDate, formatYear }
}
