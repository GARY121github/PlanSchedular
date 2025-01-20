# Step 1: Use an official Node.js runtime as a base image for building the application
FROM node:20-alpine 

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Copy Prisma schema and Prisma client configuration
COPY prisma ./prisma

# Step 5: Install dependencies, including devDependencies
RUN npm install

# Step 6: Generate Prisma Client
RUN npx prisma generate

# Step 7: Copy the application code
COPY . .

# Step 8: Expose the application port (default: 8080)
EXPOSE 8080

# Step 9: Define the command to run the application
CMD ["npm", "start"]
