#!/usr/bin/env bash
# Reconstruye case-study.html incrustando assets/*.jpg como data URIs.
# Uso:  bash build.sh
# Después:  volver a publicar case-study.html en el mismo Artifact (misma URL).
set -euo pipefail
cd "$(dirname "$0")"

cp page.tpl.html case-study.html

for f in assets/*.jpg; do
  slug=$(basename "$f" .jpg)
  grep -q "{{$slug}}" case-study.html || continue
  base64 -w0 "$f" > .b64tmp
  SLUG="$slug" perl -i -pe '
    BEGIN{ open(F,"<",".b64tmp"); $d=<F>; close F; chomp $d; $g=$ENV{SLUG}; }
    s{\{\{\Q$g\E\}\}}{data:image/jpeg;base64,$d}g;
  ' case-study.html
done
rm -f .b64tmp

left=$(grep -o '{{[a-z0-9-]*}}' case-study.html | sort -u || true)
if [ -n "$left" ]; then
  echo "AVISO — marcadores sin imagen en assets/:"; echo "$left"
fi

imgs=$(grep -o '<img ' case-study.html | wc -l)
uris=$(grep -o 'data:image/jpeg;base64,' case-study.html | wc -l)
size=$(stat -c%s case-study.html)
printf 'imgs=%s  dataURIs=%s  tamaño=%.2f MB (límite Artifact: 16 MB)\n' \
  "$imgs" "$uris" "$(echo "$size" | awk '{print $1/1048576}')"
[ "$imgs" = "$uris" ] || { echo "ERROR: hay <img> sin data URI"; exit 1; }
