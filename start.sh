#!/bin/bash
PGPASSWORD=password psql -U postgres -h localhost -d trainParcel < loadData.sql
docker-compose up 