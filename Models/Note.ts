import { Tag } from "./Tag"

export class Note{
    title:string
    content:string
    createDate?:string
    tags?:string
    usersId?: number
    id?:number
    private: boolean = true;
  }