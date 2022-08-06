"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const { verify } = require('jsonwebtoken');
const validateToken = (token) => {
    if (!token) {
        return false;
    }
    else
        try {
            const validToken = verify(token, "secretenv8206");
            if (validToken) {
                return true;
            }
        }
        catch (err) {
            return false;
        }
};
exports.validateToken = validateToken;
