import { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface AuthUserPayload extends JwtPayload {
    id: string;
    email?: string;
    role: Role;
    organizationId?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUserPayload;
        }
    }
}
