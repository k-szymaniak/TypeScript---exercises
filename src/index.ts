import express from 'express'
import jwt from "jsonwebtoken";
import {Request, Response} from 'express'
import {All} from '../Models/All'
import {Note} from '../Models/Note'
import {Tag} from '../Models/Tag'
import {Auth, User} from '../Models/User'
import {FileOperations } from '../FileOperations';

const app = express()
app.use(express.json())
const ACCESS_TOKEN = 'bckjabdkjawj4l23k4j23lj4i23o4u328908342';

//Deklaracja
let all = new All();
const CurrentUser = new User() 
const fileOperations = new FileOperations()
fileOperations.readStorage().then((data) => {
  if (data) 
    all = JSON.parse(data);
  else 
    all = new All()
});  

//LOGOWANIE
app.post('/login', (req: Request, res: Response) =>{
  const user = all.users.find(u => u.login === req.body.login)
  if(!user)
    return res.send("User not exists").status(401)
  const payload = user;

  //Dane uzytkownika
  CurrentUser.id = user.id
  CurrentUser.login = user.login

  console.log(CurrentUser)
  const token = jwt.sign(payload, ACCESS_TOKEN);
  res.json({token})
})

//POBIERANIE NOTATEK UŻYTKOWNIKA
//PRZED PRZETESTOWANIEM ZALOGOWAĆ SIE PONOWNIE 
app.get('/notes/user/:userName', async function(req, res){
if(Auth(req, res, ACCESS_TOKEN)){
  await fileOperations.readStorage();
  var priv = all.notes.filter(x => x.private == true)  //Prywatne notki
  var ownerpriv = priv.filter(u => u.usersId == CurrentUser.id) //Notki uzytkownika

  res.status(200).send(ownerpriv)
}
else
    res.status(401).send("Access denied")
})

//POBIERANIE LISTY NOTATEK
app.get('/notes', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){
  if(all.notes == undefined) res.status(400)
  await fileOperations.readStorage();
  res.status(200).send(all.notes)
}
else
  res.status(401).send("Access denied")
})

//Wyswietlanie
app.get('/note/:id', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){
  await fileOperations.readStorage();
  const note = all.notes.find(n => n.id === +req.params.id)
  console.log(+req.params.id)
  if(note == undefined ) res.status(404).send('Note does not exist')
  else res.status(200).json(note)
}
else
  res.status(401).send("Access denied")
})

//DODAWANIE
app.post('/note', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){
  await fileOperations.readStorage()
  const note: Note = req.body
  if(note.title == undefined) res.status(400).send('Note title is undefined')
  if(note.content == undefined) res.status(400).send('Note content is undefined')

  if(note.tags)
  {
    const exists = all.tags.find(tag => tag.name === note.tags)
    if(!exists){
        const tag: Tag = {
          name: note.tags,
          id: Date.now()
        }
        all.tags.push(tag)
      }
  }
  note.id = Date.now()
  console.log(CurrentUser)
  if(CurrentUser)
    note.usersId = CurrentUser.id
  all.notes.push(note)
  res.status(201).send(note)
  await fileOperations.updateStorage(all)
}
else
    res.status(401).send("Access denied")
})
//EDYCJA
app.put('/note/:id', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){
  const id = Number(req.params.id)
  const note = all.notes.findIndex(note => note.id === id)
  if(note == undefined ) res.status(404).send('Note does not exist')

  const updatedNote = {
    title: req.body.title,
    content: req.body.content,
    id: id,
    private: req.body.private
  }

  console.log(all.notes)
  if(updatedNote == undefined) res.status(404).send('Note does not exist')
  if(updatedNote.title == undefined) res.status(404).send('Note title is undefined')
  if(updatedNote.content == undefined) res.status(404).send('Note content is undefined')
  if(updatedNote.private == undefined) updatedNote.private = true
  all.notes[note] = updatedNote
  res.send().status(204)
  await fileOperations.updateStorage(all)
}
else
  res.status(401).send("Access denied")
})
//USUWANIE
app.delete('/note/:id', async function (req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){  
  const note = all.notes.find(n => n.id === +req.params.id)
  if(note === undefined) {
      res.status(400).send('Note does not exist')
  }
  else {
      const index = all.notes.indexOf(note!, 0)
      all.notes.splice(index, 1)
      console.log(note)
      res.status(204).send(note)
      await fileOperations.updateStorage(all);
  }
}
else
  res.status(401).send("Access denied")
})


 //DODAWANIE TAGOW
app.post('/tag', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){    
  await fileOperations.readStorage()
  const tag = req.body
  tag.name = tag.name.toLowerCase()
  const name = req.body.name.toLowerCase()
  if(tag.name == undefined) res.status(400).send('Tag name is undefined')

  const exists = all.tags.find(tag => tag.name === name)
  if(exists) 
    res.status(404).send("Tag exists.")
  else{
    tag.id = Date.now()
    all.tags.push(tag)
    res.status(201).send(tag)
    await fileOperations.updateStorage(all)
  }
}
else
  res.status(401).send("Access denied")
})

//Wyswietlanie TAGOW
app.get('/tag/:id', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){   
  await fileOperations.readStorage();
  const id = Number(req.params.id)
  const tag = all.tags.find(tag => tag.id === id)
  if(tag == undefined ) res.status(404).send('Note does not exist')
  res.status(200).json(tag)
}
else
  res.status(401).send("Access denied")
})

//POBIERANIE LISTY TAGOW
app.get('/tags', function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){      
  if(all.tags == undefined) res.status(400)
     res.status(200).send(all.tags)
}
else
  res.status(401).send("Access denied")
 })

 //EDYCJA TAGOW
 app.put('/tag/:id', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){       
  const id = Number(req.params.id)
  const tag = all.tags.findIndex(tag => tag.id === id)
  if(tag == undefined ) res.status(404).send('Note does not exist')

  const updatedTag = {
    id: id,
    name: req.body.name
  }

  if(updatedTag == undefined) res.status(404).send('Note does not exist')
  if(updatedTag.name == undefined) res.status(404).send('Note title is undefined')
  all.tags[tag] = updatedTag
  res.send().status(204)
  await fileOperations.updateStorage(all)
}
else
  res.status(401).send("Access denied")
})

 //USUWANIE TAGOW
app.delete('/tag/:id', async function(req: Request, res: Response){
if(Auth(req, res, ACCESS_TOKEN)){     
  const tag = all.tags.find(t => t.id === +req.params.id)
  if(tag == undefined ) res.status(400).send('Note does not exist')
  else{
    const index = all.tags.indexOf(tag!, 0)
      all.tags.splice(index, 1)
      res.status(204).send(tag)
      await fileOperations.updateStorage(all);
  }
}
else
  res.status(401).send("Access denied")
})

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title
  res.status(200).send('POST Hello World')
})

app.listen(3000)