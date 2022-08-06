const { verify } = require('jsonwebtoken')

export const validateToken = (token:string) => {

    if (!token) {
        return false
    } else try {
        const validToken = verify(token, "secretenv8206")
        if (validToken) {
            return true
        }
    } catch (err) {
        return false
    }
}