# pull official base image
FROM node:12.19.0

# set working directory
WORKDIR /react-maze

# add `/app/node_modules/.bin` to $PATH
ENV PATH /react-maze/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.3 -g --silent

# add app
COPY . ./

# start app, backend
CMD ["npm", "run server"]

# start app client
CMD ["npm", "start"]
