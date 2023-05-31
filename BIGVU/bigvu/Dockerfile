# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the frontend directory
COPY frontend frontend

# Install the application's dependencies inside the Docker image
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

# Copy the backend directory
WORKDIR /usr/src/app
COPY backend backend

# Copy the build directory from the frontend directory to the backend directory
RUN mv frontend/build backend/build

# Install the application's dependencies inside the Docker image
WORKDIR /usr/src/app/backend
RUN npm install


# Make the container listen on the specified network ports at runtime
EXPOSE 5001

# Define the command to run the application
CMD [ "node", "App.js" ]