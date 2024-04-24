import { LoginModel } from "../model/login.Model";
import { RegisterModel } from "../model/register.model";
import { GLOBAL } from "./global";
export async function RegisterService(registerModel: RegisterModel) {
  try {
    const response = await fetch(`${GLOBAL.url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        
      body:JSON.stringify(registerModel),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function LoginService(loginModel:LoginModel){
  console.log(loginModel)
  try {
    const response = await fetch(`${GLOBAL.url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        
      body:JSON.stringify(loginModel),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}