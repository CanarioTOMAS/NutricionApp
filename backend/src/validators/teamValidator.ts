import Joi from "joi";

interface CreateTeam {
  name: string;
  description: string;
}

interface UpdateTeam {
  _id?: string;
  name?: string;
  description?: string;
}

const createTeamSchema: Joi.ObjectSchema<CreateTeam> = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const updateTeamSchema: Joi.ObjectSchema<UpdateTeam> = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1),
  description: Joi.string(),
});

export { createTeamSchema, updateTeamSchema };
