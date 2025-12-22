FROM node:20-bookworm

WORKDIR /app

# 1. Copy dependency files
COPY package.json package-lock.json ./

# 2. Install deps
RUN npm ci

# 3. Copy source
COPY . .

# 4. Prisma generate
RUN npx prisma generate

# 5. Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
