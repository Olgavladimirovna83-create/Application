# /src/storage — ObjectStorageService

Абстракция над object storage для крупных/сырых объектов (изображения, видео, крупные JSON — `24_TECHNICAL_ARCHITECTURE.md` §16). Текущий provider — Cloudflare R2 (S3-совместимый), но domain-код зависит только от `ObjectStorageService`, не от AWS SDK и не от R2 (CLAUDE.md §4.1).

- `ObjectStorageService.ts` — интерфейс
- `providers/r2.ts` — реализация через `@aws-sdk/client-s3`; единственный файл, которому разрешено импортировать этот SDK
- `index.ts` — публичный экспорт: `getObjectStorageService()` + типы
