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

    const folderName = uuidv4();
    const blob = bucket.file(`${folderName}/${file.originalname}`);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        resolve(`${bucketName}/${folderName}/${file.originalname}`);
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.end(file.buffer);
    });
  }
}
// import { Storage } from '@google-cloud/storage';
// import { Injectable } from '@nestjs/common';

// /// 여까지
// @Injectable()
// export class FilesService {
//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     if (!file) {
//       throw new Error('No file uploaded');
//     }

//     // 스토리지 설정
//     const bucketName = 'shopping-mall-storage';
//     const storage = new Storage({
//       projectId: process.env.PROJECT_ID,
//       keyFilename: process.env.KEY_FILE_NAME,
//     });
//     const bucket = storage.bucket(bucketName);

//     // 파일 업로드
//     const blob = bucket.file(file.originalname);
//     const blobStream = blob.createWriteStream();

//     return new Promise((resolve, reject) => {
//       blobStream.on('finish', () => {
//         resolve(`${bucketName}/${file.originalname}`);
//       });

//       blobStream.on('error', (err) => {
//         reject(err);
//       });

//       blobStream.end(file.buffer);
//     });
//   }
//   async uploadFiles(files: Express.Multer.File): Promise<string[]> {
//     if (!files || Object.keys(files).length === 0) {
//       throw new Error('No files uploaded');
//     }

//     const uploadPromises: Promise<string>[] = [];

//     // files 객체의 값(파일 배열)을 추출하여 배열로 변환
//     const fileArray: Express.Multer.File[] = Object.values(files);

//     fileArray.forEach((file: Express.Multer.File) => {
//       const promise = this.uploadFileToStorage(file);
//       uploadPromises.push(promise);
//     });

//     return Promise.all(uploadPromises);
//   }

//   private async uploadFileToStorage(file: Express.Multer.File): Promise<string> {
//     const bucketName = 'shopping-mall-storage';
//     const storage = new Storage({
//       projectId: process.env.PROJECT_ID,
//       keyFilename: process.env.KEY_FILE_NAME,
//     });
//     const bucket = storage.bucket(bucketName);

//     const blob = bucket.file(file.originalname);
//     const blobStream = blob.createWriteStream();

//     return new Promise((resolve, reject) => {
//       blobStream.on('finish', () => {
//         resolve(`${bucketName}/${file.originalname}`);
//       });

//       blobStream.on('error', (err) => {
//         reject(err);
//       });

//       blobStream.end(file.buffer);
//     });
//   }
// }
