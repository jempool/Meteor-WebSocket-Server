#!/bin/bash

export $(grep -v '^#' .env | xargs)


echo -e "\n\e[32mRunning Meteor with environment variables\e[0m (.env file)\n"

meteor.bat run
