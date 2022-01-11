import React from 'react'

export const useDate = () => {
    const [date] = React.useState(new Date())
    const formatDate = () => {
        const formatDate = date.toLocaleString().substring(5, 9);
        return formatDate

    }
    return { formatDate }
}
