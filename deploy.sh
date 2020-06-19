#!/usr/bin/env sh

# Exit on failures
set -e;

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
IMAGE_NAME=santiario/er-polet-aapent
VERSION=$(git rev-parse HEAD)

docker build --pull -t $IMAGE_NAME:"$VERSION" -t $IMAGE_NAME:latest .
docker push $IMAGE_NAME:"$VERSION"
docker push $IMAGE_NAME:latest
echo "PUBLISHED DOCKER IMAGE $IMAGE_NAME:$VERSION"
