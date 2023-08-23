import jwt from 'jsonwebtoken';

export function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET  || "RAJuIUEUG8O7uPUNc0XKfjUjg8kSF3HkLwn", { expiresIn: '12h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || "RAJuIUEUG8O7uPUNc0XKfjUjg8kSF3HkLwn");
    } catch (err) {
        return null;
    }
}