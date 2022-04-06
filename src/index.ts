import express, { Request, Response, NextFunction } from 'express';
const app = express()  


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

