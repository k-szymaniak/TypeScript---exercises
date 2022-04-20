import {Note} from "./Note"
import {Tag} from "./Tag"
import {User} from "./User"

export class All{
    notes: Note[] = []
    tags: Tag[] = []
    users: User[] = [
    { 
        id: 12, login: 'czlowiek', password: '123456'
    },
    {
         id: 13, login: 'ktos', password: '1234'
    }
    ]
}