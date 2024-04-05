import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.body).length) {
        await schema.validateAsync(req.body);
      }
      if (Object.keys(req.params).length) {
        await schema.validateAsync(req.params);
      }

      next();
    } catch (error: any) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  };
};

export default validateSchema;
