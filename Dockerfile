FROM oven/bun:1.1.0

WORKDIR /app


COPY . .

RUN bun install

RUN bunx prisma generate


EXPOSE 3000


CMD ["bun", "run", "src/server.ts"]
