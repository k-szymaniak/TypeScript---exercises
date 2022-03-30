import express from 'express'
import {Request, Response} from 'express'

interface date{
  Id: number;
  name: string;
}

const app = express()
const date = new Date()
const jsonData = JSON.stringify(date)
const note = JSON.parse(jsonData)



app.use(express.json())

app.get('/note/:id', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.send(note)
  res.sendStatus(200)
})
app.post('/note', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title śś
  res.send(date)
  res.sendStatus(201)
})
app.put('/note/:id', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(204).send("")
})
app.delete('/note/:id', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(204).send("")
})

app.listen(3000)