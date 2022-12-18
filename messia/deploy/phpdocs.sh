#!/bin/bash
SELF_DIR="$(dirname "$(readlink -f "$0")")"
cd $SELF_DIR
cd ..

php -r "copy('https://github.com/phpDocumentor/phpDocumentor/releases/download/v3.3.1/phpDocumentor.phar', 'phpDocumentor.phar');"

# a way to call it from console: sh deploy/phpdocs.sh true
# if you want to have graphs generated https://www.graphviz.org/ must be installed in your OS.
php phpDocumentor.phar -c phpdoc.xml --force --setting=graphs.enabled=$1

# rm -f phpDocumentor.phar