FROM node:16 

# Create src directory 
WORKDIR /app

RUN npm install -g serve



EXPOSE 3000 

# start static server
CMD serve -s build