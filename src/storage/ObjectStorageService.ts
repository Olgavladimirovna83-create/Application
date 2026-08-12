export interface UploadParams {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
}

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * Абстракция над object storage (сейчас — Cloudflare R2, S3-совместимое).
 * Domain-код никогда не импортирует providers/* или AWS SDK напрямую
 * (CLAUDE.md §4.1, 31_INFRASTRUCTURE_DEPLOYMENT.md §62).
 */
export interface ObjectStorageService {
  upload(params: UploadParams): Promise<UploadResult>;
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
  delete(key: string): Promise<void>;
}
