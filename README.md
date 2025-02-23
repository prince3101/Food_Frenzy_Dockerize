Before you begin, ensure you have the following installed:

Docker: Install Docker

Docker Compose (included with Docker Desktop)

# For Ubuntu :

Update package list and install dependencies

sudo apt update

sudo apt install -y ca-certificates curl gnupg

# Add Docker’s official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
docker --version

# 1. Clone the repository:

git clone https://github.com/prince3101/Food_Frenzy_Dockerize.git
cd Food_Frenzy_Dockerize

# 2. Build and start the application using Docker Compose:

docker-compose up --build

# 3. Access the application:

Frontend: http://localhost:3001
Admin : http://localhost:3000
Backend API: http://localhost:8000
Mongo : http://localhost:27018

# 4. To stop the application:

docker-compose down

