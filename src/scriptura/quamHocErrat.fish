#!/usr/bin/fish

command npx vue-tsc -p (command git rev-parse --show-toplevel)/tsconfig.typecheck.json 2>&1 | command awk -v scapum="$argv[1]" '/^[^[:space:]]+\([0-9]+,[0-9]+\): (error|warning) TS[0-9]+:/ { inventum = index($0, scapum "(") == 1 } inventum { print }'
