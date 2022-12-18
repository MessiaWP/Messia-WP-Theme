#!/bin/bash
GREEN_BG="\e[42m"
GREEN_FG="\e[32m"
ENDCOLOR="\e[0m"

SELF_DIR="$(dirname "$(readlink -f "$0")")"
cd $SELF_DIR
cd ..

echo -e "${GREEN_FG}Installing MODULES FOR Messia${ENDCOLOR}"
echo -e "${GREEN_FG}-----------------------------${ENDCOLOR}"
npm install
echo -e "${GREEN_FG}DONE${ENDCOLOR}\n\n\n"

echo -e "${GREEN_FG}Compiling assets for production${ENDCOLOR}"
echo -e "${GREEN_FG}-------------------------------${ENDCOLOR}"
npm run prod
echo -e "${GREEN_FG}DONE${ENDCOLOR}\n\n\n"