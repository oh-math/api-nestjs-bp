import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ACESS_KEY_ID, SECRET_ACESS_KEY } from 'src/helper';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Client.name);
  private region: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('S3_REGION') || 'sa-east-1';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        secretAccessKey: SECRET_ACESS_KEY,
        accessKeyId: ACESS_KEY_ID,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    const putObject = new PutObjectCommand(input);

    try {
      const response: PutObjectCommandOutput = await this.s3.send(putObject);

      if (response.$metadata.httpStatusCode === 200)
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;

      throw new Error('Image not saved to S3!');
    } catch (err) {
      this.logger.error(`Cannot save file inside s3`, err);
      throw err;
    }
  }
}
