import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

import { FilesController } from "./controllers/FilesController";
const router = Router();

const uploadFile = multer(uploadConfig);

const mediaController = new FilesController();

router.post('/api/file', uploadFile.single("file"), mediaController.upload);
router.get('/api/file/:name', mediaController.get);
router.delete('/api/file/:name', mediaController.delete);

export { router };