import { Request, Response } from 'express'
import jwt from "jsonwebtoken"

export class User{
    id?: number
    login: string
    password: string

    constructor(user?: User){
      if(user){
        this.login = user.login
        this.password = user.password
      }
      else{
        this.login = ''
        this.password = ''
      }
    }
}

export const Auth = (req: Request, res: Response, ACCESS_TOKEN: string) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token){
        return false;
      }
      const payload = jwt.verify(token, ACCESS_TOKEN) as { login: string };
      if (payload) {
        return true;
      } 
    } catch (error) {
      res.status(401).send(error);
    }
  };