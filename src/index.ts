import express from 'express'
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

const app = express()  
app.use(express.json())

//private async readStorage(): Promise<void> {
  try {
      const data = await fs.promises.readFile(storeFile, 'utf-8');
  } catch (err) {
      console.log(err)
  } 
}

//private async updateStorage(): Promise<void> {
 // try {
 //     await fs.promises.writeFile(storeFile, dataToSave);
 // } catch (err) {
 //     console.log(err)
//  }
//}




interface NoteItem {
 title: string;
 content: string;
 createDate: string;
 tags: string[];
 id?: number;
};

  let Note: NoteItem[] = [
    {
      title: 'Note',
      content: 'test',
      createDate: 'dad',
      tags: ['','',''],
      id: 2
    },
    {
      title: 'Note',
      content: 'test',
      createDate: 'dad',
      tags: ['','',''],
      id: 3
    }
  ];


app.post('/note', function (req, res) {  
  res.status(201).json(Note); 
  console.log(req.body)
})  

app.get('/note/:id', function (req, res) {  
  res.status(200).json(Note); 
})  

app.put('/note/:id', function (req, res) {  
  res.status(204).json(Note); 
})  

app.delete('/note/:id', function (req, res) {  
  res.status(204).json(Note); 
})  

app.listen(3000)  

