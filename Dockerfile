# Stage 1: Build the Spring Boot JAR using Maven
FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app
COPY . .

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Run the packaged JAR with a smaller Java image
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 to match your Spring Boot server.port
EXPOSE 8080

# Start the Spring Boot app
CMD ["java", "-jar", "app.jar"]
