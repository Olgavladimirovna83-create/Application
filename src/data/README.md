# /src/data — DATA layer

Data-access слой для PostgreSQL. Единственное место в кодовой базе, которое обращается к `@prisma/client` напрямую (`prismaClient.ts`) — остальной код импортирует репозитории/сервисы отсюда, не Prisma Client напрямую (CLAUDE.md §4.1).

Схема — `prisma/schema.prisma`. Сущности и репозитории добавляются в Task 1.1.
