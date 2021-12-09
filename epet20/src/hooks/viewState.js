import { useState } from "react"

export const useView = (initialState = 10) => {
    const [view, setview] = useState(initialState)
    const changeView = (newView) => {
        setview(newView)
        console.log(`view changed to ${newView}`)
    }
    return { view, changeView }
}
