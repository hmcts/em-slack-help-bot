FROM hmctspublic.azurecr.io/base/node:18-alpine

COPY package*.json ./

RUN npm ci --only=production

COPY --chown=hmcts:hmcts . .

CMD ["node", "app.js"]

EXPOSE 3000