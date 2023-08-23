import { verifyToken } from "../services/auth.services.js";

export function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const payload = verifyToken(token);
        if (!payload) return res.sendStatus(401);

        res.locals.userId = payload.userId;

        next();
    } catch (err) {
        res.status(500).send(err);
    }
}
