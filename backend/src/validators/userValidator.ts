import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

interface CreateUserInput {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
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

interface UserLoginInput {
  email: string;
  password: string;
}
interface PasswordComplexityOptions {
  min?: number;
  max?: number;
  lowerCase?: number;
  upperCase?: number;
  numeric?: number;
  symbol?: number;
  requirementCount?: number;
}
const complexityOptions: PasswordComplexityOptions = {
  min: 8,
  max: 16,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const createUserSchema: Joi.ObjectSchema<CreateUserInput> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(value => passwordComplexity(complexityOptions).validate(value)),
});

const updateUserSchema: Joi.ObjectSchema<UpdateUserInput> = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1).max(30),
  address: Joi.string(),
  gender: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  role: Joi.string(),
  placeOfBirth: Joi.string(),
  status:Joi.string(),
});

const getUserLogin: Joi.ObjectSchema<UserLoginInput> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(value => passwordComplexity(complexityOptions).validate(value)),
});

export {
  createUserSchema,
  updateUserSchema,
  getUserLogin,
};
