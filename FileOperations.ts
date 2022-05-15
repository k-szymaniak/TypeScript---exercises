import fs from 'fs';
import { All } from './Models/All';

export class FileOperations{

    public async readStorage(): Promise<string> {
        try {
            return await fs.promises.readFile('./storeFile.json', 'utf-8')
        } catch (err) {
            console.log(err)
            return ""
        }
    }
    
    public async updateStorage(data:All): Promise<void> {
      try {
          await fs.promises.writeFile('./storeFile.json', JSON.stringify(data))
      } catch (err) {
          console.log(err)
      }
    }
  
    
}