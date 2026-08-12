import type { ObjectStorageService } from './ObjectStorageService';
import { createR2StorageService } from './providers/r2';

let service: ObjectStorageService | null = null;

export function getObjectStorageService(): ObjectStorageService {
  if (!service) {
    service = createR2StorageService();
  }
  return service;
}

export type { ObjectStorageService, UploadParams, UploadResult } from './ObjectStorageService';
