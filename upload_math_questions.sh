#!/bin/bash

# === Konfiguration ===
# URL des API-Endpunkts für den Aufgabenserver
URL="https://idefix.informatik.htw-dresden.de:8888/api"
# Zugangsdaten für Benutzer-Authentifizierung (Achtung: nicht öffentlich verwenden!)
USER_EMAIL="s83754@htw-dresden.de"
USER_PASS="#+6fFML8ek"
USER="$USER_EMAIL:$USER_PASS"

# Registrierung (falls noch nicht vorhanden) – keine Fehlermeldung, wenn bereits registriert
echo "⚙️ Registriere Nutzer (wird ignoriert, wenn schon vorhanden)..."
curl -s -X POST -H "Content-Type: application/json" "$URL/register" --data \
"{\"email\":\"$USER_EMAIL\", \"password\": \"$USER_PASS\"}"

# Löscht alle existierenden Quizfragen auf dem Server
echo -e "\n🧹 Lösche vorhandene Fragen..."
ALL_IDS=$(curl -s --user "$USER" "$URL/quizzes" | jq '.[].id') # Holt alle Quiz-IDs
for ID in $ALL_IDS; do
  echo "❌ Lösche Frage ID $ID..."
  curl -s --user "$USER" -X DELETE "$URL/quizzes/$ID"
done

# Neue Mathefragen als JSON-Daten definieren
echo -e "\n📥 Lade neue Mathefragen hoch..."
QUESTIONS=(
'{"title":"maths","text":"What is the derivative of \\( x^2 \\)?","options":["2x","x","x^3","1"],"answer":[0]}'
'{"title":"maths","text":"What is the integral of \\( \\sin(x) \\)?","options":["-cos(x)","cos(x)","tan(x)","1"],"answer":[0]}'
'{"title":"maths","text":"What is the square root of 144?","options":["12","14","10","16"],"answer":[0]}'
'{"title":"maths","text":"What is \\( 5! \\)?","options":["120","60","24","720"],"answer":[0]}'
'{"title":"maths","text":"What is the limit of \\( 1/x \\) as \\( x \\to \\infty \\)?","options":["0","Infinity","1","-Infinity"],"answer":[0]}'
)

# Hochladen jeder einzelnen Frage per POST
for Q in "${QUESTIONS[@]}"; do
  echo -e "\n➡️ Sende Frage: ${Q:0:60}..."
  curl -s --user "$USER" -X POST -H "Content-Type: application/json" -d "$Q" "$URL/quizzes"
  echo -e "\n✅ Erfolgreich hochgeladen."
done

# Übersicht der aktuell auf dem Server vorhandenen Fragen
echo -e "\n🔍 Deine aktuellen Fragen:"
curl -s --user "$USER" "$URL/quizzes" | jq '.[] | {id, title, text}'
