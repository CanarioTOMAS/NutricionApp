import Joi, { ObjectSchema, StringSchema } from 'joi';
import passwordComplexity from 'joi-password-complexity';

interface CreateUserSchema {
  name: string;
  surname: string;
  email: string;
  password: StringSchema;
}

interface UpdateUserSchema {
  _id?: string;
  name?: string;
  surname?: string;
  address?: string;
  gender?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
  image?: string;
}

interface GetUserLogin {
  email: string;
  password: string;
}

const complexityOptions = {
  min: 8,
  max: 16,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const createUserSchema: ObjectSchema<CreateUserSchema> = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions),
}); 

const updateUserSchema: ObjectSchema<UpdateUserSchema> = Joi.object({
  _id: Joi.string(),
  name: Joi.string().min(1).max(30),
  surname: Joi.string().min(1).max(30),
  address: Joi.string(), 
  gender: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  password: Joi.string(),
  role: Joi.string(),
  image: Joi.string(),
}); 

const getUserLogin: ObjectSchema<GetUserLogin> = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions).required(),
}); 

export {
  createUserSchema,
  updateUserSchema,
  getUserLogin
};
