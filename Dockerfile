# Stage 1: Build the Spring Boot JAR using Maven
FROM maven:3.9.4-eclipse-temurin-17 as build

WORKDIR /app

# Copy only the backend code (where pom.xml is)
COPY Backend/ /app/

RUN mvn clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the jar file from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
