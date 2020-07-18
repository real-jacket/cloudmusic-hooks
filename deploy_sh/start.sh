#!/bin/bash

docker pull xiaomu1993/cloud-music:latest
docker pull binaryify/netease_cloud_music_api:latest
docker-compose -f docker-compose.yml up -d --force-recreate