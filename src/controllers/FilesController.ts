import { Request, Response } from 'express';
import { FilesService } from '../services/FilesService';

export class FilesController {
  async upload(req: Request, res: Response) {
    const file = req.file.filename;
    const { folder } = req.body;

    try {
      const mediaService = new FilesService();
      const response = await mediaService.save(file, folder);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error });
    }
    
  }
  
  async get(req: Request, res: Response) {
    const { name } = req.params;
    try {
      const mediaService = new FilesService();
      const response = await mediaService.get(name);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    const { name } = req.params;
    try {
      const mediaService = new FilesService();
      await mediaService.delete(name);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

}