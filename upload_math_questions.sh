#!/bin/bash

# === Konfiguration ===
URL="https://idefix.informatik.htw-dresden.de:8888/api"
USER_EMAIL="s83754@htw-dresden.de"
USER_PASS="#+6fFML8ek"
USER="$USER_EMAIL:$USER_PASS"

echo "⚙️  Registriere Nutzer (wird ignoriert, wenn schon vorhanden)..."
curl -s -X POST -H "Content-Type: application/json" "$URL/register" --data \
"{\"email\":\"$USER_EMAIL\", \"password\": \"$USER_PASS\"}"

echo -e "\n📥 Lade Mathefragen hoch..."

# === Fragenliste ===
QUESTIONS=(
'{"title":"math","text":"What is the derivative of \\( x^2 \\)?","options":["2x","x","x^3","1"],"answer":[0]}'
'{"title":"math","text":"What is the integral of \\( \\sin(x) \\)?","options":["-cos(x)","cos(x)","tan(x)","1"],"answer":[0]}'
'{"title":"math","text":"What is the square root of 144?","options":["12","14","10","16"],"answer":[0]}'
'{"title":"math","text":"What is \\( 5! \\)?","options":["120","60","24","720"],"answer":[0]}'
'{"title":"math","text":"What is the limit of \\( 1/x \\) as \\( x \\to \\infty \\)?","options":["0","Infinity","1","-Infinity"],"answer":[0]}'
'{"title":"math","text":"What is the area of a circle with radius \\( r \\)?","options":["\\( \\pi r^2 \\)","\\( 2\\pi r \\)","\\( \\pi r \\)","\\( r^2 \\)"],"answer":[0]}'
'{"title":"math","text":"What is the value of \\( e^0 \\)?","options":["1","0","e","undefined"],"answer":[0]}'
'{"title":"math","text":"Solve: \\( x^2 - 4x + 4 = 0 \\)","options":["2","0","4","-2"],"answer":[0]}'
'{"title":"math","text":"What is the ratio of the geometric sequence 2, 4, 8, 16, ...?","options":["2","4","8","16"],"answer":[0]}'
'{"title":"math","text":"What is \\( \\log_{10}(1000) \\)?","options":["3","2","1","0"],"answer":[0]}'
)

# === Schleife zum Hochladen ===
for Q in "${QUESTIONS[@]}"; do
  echo -e "\n➡️  Sende Frage: ${Q:0:60}..."
  curl -s --user "$USER" -X POST -H "Content-Type: application/json" -d "$Q" "$URL/quizzes"
  echo -e "\n✅ Erfolgreich hochgeladen."
done

echo -e "\n🎉 Alle Fragen wurden übertragen."
