FROM node:12.9
WORKDIR /train-parcel
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 3000

