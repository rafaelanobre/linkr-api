import jwt from 'jsonwebtoken';

export function createToken(user) {
    const payload = {
        userId: user.id,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}
