#!/bin/bash
GREEN_BG="\e[42m"
GREEN_FG="\e[32m"
ENDCOLOR="\e[0m"

SELF_DIR="$(dirname "$(readlink -f "$0")")"
cd $SELF_DIR
cd ..

echo -e "${GREEN_FG}Installing VENDORS FOR Messia${ENDCOLOR}"
echo -e "${GREEN_FG}-----------------------------${ENDCOLOR}"
composer install
echo -e "${GREEN_FG}DONE${ENDCOLOR}\n\n\n"