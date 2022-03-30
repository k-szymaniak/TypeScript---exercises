import express from 'express'
import {Request, Response} from 'express'
import { text } from 'stream/consumers'

const app = express()

const date = new Date()
let text2 : string
app.use(express.json())

app.get('/note/:text2', function (req: Request, res: Response) {
   // res.sendStatus(200).send(app)
   res.send(text2)
   console.log(text2)
})
app.post('/note', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(201).send(date.toISOString())
  
})
app.put('/note/:id', function (req: Request, res: Response) {
    console.log(req.body) // e.x. req.body.title 
    res.sendStatus(204).send(date.toISOString())
})
app.delete('/note/:id', function (req: Request, res: Response) {
    console.log(req.body) // e.x. req.body.title 
    res.sendStatus(204).send(date.toISOString())
})

app.listen(3000)

.