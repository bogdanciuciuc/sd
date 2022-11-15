#1
FROM node:12-alpine AS build 
WORKDIR /usr/src/sample 
COPY package.json .
# no need for this since you put your workdir path
# RUN cd /usr/src/sample 
RUN npm install 
COPY . .

#2
FROM nginx:1.17.1-alpine 
COPY --from=build /nginx.conf /usr/share/nginx/html/
