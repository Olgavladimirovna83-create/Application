import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { ObjectStorageService, UploadParams, UploadResult } from '../ObjectStorageService';

const BUCKET = process.env.R2_BUCKET_NAME ?? '';

/**
 * Единственный файл, которому разрешено импортировать AWS S3 SDK напрямую.
 * Cloudflare R2 — S3-совместимое хранилище (CLAUDE.md §4).
 */
export function createR2StorageService(): ObjectStorageService {
  const client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
    },
  });

  return {
    async upload({ key, body, contentType }: UploadParams): Promise<UploadResult> {
      await client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: body,
          ContentType: contentType,
        }),
      );
      return { key, url: `${process.env.R2_PUBLIC_BASE_URL ?? ''}/${key}` };
    },
    async getSignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
      return getSignedUrl(client, new GetObjectCommand({ Bucket: BUCKET, Key: key }), {
        expiresIn: expiresInSeconds,
      });
    },
    async delete(key: string): Promise<void> {
      await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
    },
  };
}
