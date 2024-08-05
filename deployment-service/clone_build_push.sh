#!/bin/sh

cd $HOME

#Clone the repository
rm -rf devops-coding-challenge
git clone https://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@github.com/smart-host/devops-coding-challenge.git

#Build the backend and push the container registry (ttl.sh is used but of course, any other registry can be used)
IMAGE_NAME_BACKEND="backend_devops_test_project"
cd devops-coding-challenge/backend
docker build -t ttl.sh/${IMAGE_NAME_BACKEND}:1h .
docker image push ttl.sh/${IMAGE_NAME_BACKEND}:1h

#Build the frontend
cd ../frontend
IMAGE_NAME_FRONTEND="frontend_devops_test_project"
cd devops-coding-challenge/frontend
docker build -t ttl.sh/${IMAGE_NAME_FRONTEND}:1h .
docker image push ttl.sh/${IMAGE_NAME_FRONTEND}:1h