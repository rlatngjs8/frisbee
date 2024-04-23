import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const bucketName = 'shopping-mall-storage';
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILE_NAME,
    });
    const bucket = storage.bucket(bucketName);

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        resolve(`${bucketName}/${uuidv4()}/${file.originalname}`);
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.end(file.buffer);
    });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    console.log(files);

    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    const uploadPromises: Promise<string>[] = files.map((file: Express.Multer.File) => {
      return this.uploadFileToStorage(file);
    });

    return Promise.all(uploadPromises);
  }

  private async uploadFileToStorage(file: Express.Multer.File): Promise<string> {
    const bucketName = 'shopping-mall-storage';
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILE_NAME,
    });
    const bucket = storage.bucket(bucketName);

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        resolve(`${bucketName}/${uuidv4()}/${file.originalname}`);
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.end(file.buffer);
    });
  }
  async deleteImage({ filePath }): Promise<string> {
    const bucketName = 'shopping-mall-storage';
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILE_NAME,
    });

    // 프로필 이미지 경로를 통해 파일을 삭제합니다.
    const fileName = filePath.split('/').pop(); // 파일 이름 추출
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.delete();
    return 'deleted';
  }
  async deleteImages(filePaths: string[]): Promise<string[]> {
    const bucketName = 'shopping-mall-storage';
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILE_NAME,
    });

    const bucket = storage.bucket(bucketName);
    const deletePromises: Promise<string>[] = [];

    for (const filePath of filePaths) {
      const fileName = filePath.split('/').pop();
      const fileToDelete = bucket.file(fileName);
      const deletePromise = fileToDelete.delete().then(() => 'deleted');
      deletePromises.push(deletePromise);
    }

    await Promise.all(deletePromises);

    return filePaths;
  }
}
