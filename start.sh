#!/bin/bash

export $(grep -v '^#' .env | xargs)

echo "Running Meteor with environment variables"
echo

meteor.bat run
