import { useState } from 'react'
import { auth } from '../../firebase/firebaseConfig'

export const useAuth = (initialValue = {}) => {
    const [user, setUser] = useState(initialValue)
    setUser(auth.currentUser);
    return {
        user,
    }
}
