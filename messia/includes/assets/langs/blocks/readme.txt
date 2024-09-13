Create gutenberg translation: wp i18n make-json <Path to an existing PO file or a directory containing multiple PO files.> --no-purge
example: wp i18n make-json e:/Sites/me-messia-local.com/wp-content/themes/messia/includes/assets/langs/blocks --no-purge
example: wp i18n make-json . --no-purge

!!! The answer to question: where hash part in file name comes from is next - it is md5 of relative file that contains original string.

Example in PO file:
#: assets/blocks/asistour-search-editor.js:162
msgid "Split cards to columns in grid view mode by:"
msgstr ""

hash will be md5( 'assets/blocks/asistour-search-editor.js' )