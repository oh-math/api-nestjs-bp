import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'src/config';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Client.name);
  private readonly region: string;
  private readonly s3: S3Client;

  constructor(private configService: ConfigService) {
    const secretAccessKey = config.S3_SECRET_ACCESS_KEY;
    const accessKeyId = config.S3_ACCESS_KEY_ID;

    this.region = config.S3_REGION;
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        secretAccessKey,
        accessKeyId,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    key: string,
  ): Promise<S3UploadResponse> {
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
        return {
          url: `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`,
        };

      throw new Error('Image not saved to S3!');
    } catch (err) {
      this.logger.error(`Cannot save file inside s3`, err);
      throw err;
    }
  }
}
