# phpdoc
To create docs download phpDocumentor.phar from https://github.com/phpDocumentor/phpDocumentor/releases, put into the root and run:

`php phpDocumentor.phar --defaultpackagename=Messia --force`

Alternate is:

`php phpDocumentor.phar run -d source_path -t target_path --cache-folder path_to_cache --title="Messia WP Theme Documentation" --defaultpackagename=Messia --ignore=includes/phpwee --force`

Sample:

`php phpDocumentor.phar run -d e:/Sites/me-messia-local.com/wp-content/themes/messia/ -t e:/Sites/_phpdoc/Messia-WP-Theme-Docs --title="Messia WP Theme Documentation" --defaultpackagename=Messia --ignore=includes/phpwee --force`
