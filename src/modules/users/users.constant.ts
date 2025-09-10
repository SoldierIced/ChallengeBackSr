import crypto from "crypto";

export function hashPassword(s: string) {
    return crypto.createHash('sha256').update(s).digest('hex');
}
