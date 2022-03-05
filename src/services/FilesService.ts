import { AwsFiles } from '@prisma/client';
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import multer from '../config/multer';
import s3Client from '../config/s3';
import prismaClient from '../prisma';

export class FilesService {
  
  async save(file: string, folder: string): Promise<AwsFiles> {
    
    // uploads data to cloudinary
    const originalName = resolve(multer.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.lookup(file);

    const finalFolder = folder ?? 'default'

    await s3Client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${finalFolder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    const returnFromDb = await prismaClient.awsFiles.create({
      data: {
        name: file,
        folder: finalFolder,
        bucket: process.env.AWS_BUCKET,
        url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${finalFolder}/${file}`,
        content_type: ContentType,
      }
    });
    return returnFromDb;
  }
  

  async get(name: string): Promise<AwsFiles> {
    const file = await prismaClient.awsFiles.findFirst({
      where: {
        name
      }
    });

    return file;
  }

  async delete(name: string): Promise<void> {
    // delete image from s3
    const returnFromDb = await prismaClient.awsFiles.findFirst({
      where: {
        name
      }
    });

    await s3Client
      .deleteObject({
        Bucket: `${returnFromDb.bucket}/${returnFromDb.folder}`,
        Key: name,
      })
      .promise();

    // delete file record from database
    await prismaClient.awsFiles.delete({
      where: {
        name
      }
    });
  }
}