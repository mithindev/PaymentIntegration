# Stage 1: Build the React app using Vite
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /THOTTIL

# Copy only the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project, excluding files listed in .dockerignore
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app
FROM node:18-alpine

WORKDIR /THOTTIL

# Copy the built files from the previous stage
COPY --from=build /THOTTIL/dist /THOTTIL/dist

# Install serve globally to serve static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3005

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
