#!/bin/bash

export $(grep -v '^#' .env | xargs)

echo "Running Meteor with environment variables"

meteor.bat run
