#!/bin/bash
GREEN_BG="\e[42m"
GREEN_FG="\e[32m"
ENDCOLOR="\e[0m"

SELF_DIR="$(dirname "$(readlink -f "$0")")"
cd $SELF_DIR
cd ..

php -r "copy('https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar', 'wp-cli.phar');"

echo -e "${GREEN_FG}Localization job - Generating POT file FOR Messia theme${ENDCOLOR}"
echo -e "${GREEN_FG}--------------------------------------------------------------${ENDCOLOR}"
php -d xdebug.max_nesting_level=512 wp-cli.phar i18n make-pot . includes/assets/langs/messia.pot --domain=messia --skip-js --exclude=includes/assets --allow-root
php -d xdebug.max_nesting_level=512 wp-cli.phar i18n make-pot includes/assets/js/blocks includes/assets/langs/blocks/blocks.pot --domain=messia --skip-php --exclude=includes/assets --allow-root
echo -e "\n"

echo -e "${GREEN_FG}Updating PO files from POT file${ENDCOLOR}"
echo -e "${GREEN_FG}------------------------------ ${ENDCOLOR}"
php wp-cli.phar i18n update-po includes/assets/langs/messia.pot --allow-root
php wp-cli.phar i18n update-po includes/assets/langs/blocks/blocks.pot --allow-root
echo -e "\n"

echo -e "${GREEN_FG}Generating MO files from PO files${ENDCOLOR}"
echo -e "${GREEN_FG}---------------------------------${ENDCOLOR}"
php wp-cli.phar i18n make-mo includes/assets/langs --allow-root
php wp-cli.phar i18n make-mo includes/assets/langs/blocks --allow-root
echo -e "\n"

echo -e "${GREEN_FG}Generating JSON files for blocks${ENDCOLOR}"
echo -e "${GREEN_FG}--------------------------------${ENDCOLOR}"
php wp-cli.phar i18n make-json includes/assets/langs/blocks --no-purge

rm -f wp-cli.phar
echo -e "${GREEN_FG}DONE${ENDCOLOR}\n"