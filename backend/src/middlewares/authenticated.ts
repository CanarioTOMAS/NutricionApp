import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';
import moment from 'moment';

const secretKey = "CanarioMartinez2024";

interface AuthRequest extends Request {
  user?: any; 
}

export const ensureAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "La petición no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization as string;

  try {
    const payload = jwt.decode(token, secretKey);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "El token ha expirado" });
    }
    
    req.user = payload;
    next();
  } catch (ex) {
    return res.status(404).send({ message: "Token no válido" });
  }
};
