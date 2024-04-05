import Joi from 'joi';

interface CreatePlayer {
    name: string;
    surname:string;
    dni:string;
    temaId:string;
}

interface UpdatePlayer {
  _id?: string;
  name?: string;
  surname?: string;
  dni?:string;
}



const createPlayerSchema: Joi.ObjectSchema<CreatePlayer> = Joi.object({
  name: Joi.string().required(),
  dni: Joi.string().required(),
  surname:Joi.string(),
  teamId:Joi.string()
});

const updatePlayerSchema: Joi.ObjectSchema<UpdatePlayer> = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1),
  surname: Joi.string(),
  dni:Joi.string()
});


export {
  createPlayerSchema,
  updatePlayerSchema,
};
