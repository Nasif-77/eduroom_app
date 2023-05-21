// import { useNavigate } from "react-router-dom"

export const IsAuth = () => {
    try {
        const token = localStorage.getItem('token')
        if (token) return token
        else return false
    } catch (error) {
        return error
    }
}

