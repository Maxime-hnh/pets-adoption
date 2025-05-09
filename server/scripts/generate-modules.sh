#!/bin/bash
#chmod +x scripts/generate-modules.sh
#./scripts/generate-modules.sh


entities=("animals" "favorites" "messages" "donations" "events" "incompatibilities" "audit-logs")

for entity in "${entities[@]}"
do
  echo "📦 Génération pour: $entity"
  nest g module modules/$entity
  nest g service modules/$entity
  nest g controller modules/$entity
done

