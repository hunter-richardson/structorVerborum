#!/bin/sh

filum='./tsconfig.json'
if [ ! -f "${filum}" ]; then
  builtin echo 'Quomodo huc veni'
  builtin exit 1
fi

invenienda=$(command grep outDir ${filum} | command awk '{ print $2 }' | command tr -d '[\",]')
if [ -z "${invenienda}" ]; then
  builtin echo 'Figura malust'
  builtin exit 1
fi

if [ ! -d "${inveniendus}" ]; then
  builtin echo 'Via invenienda nullast'
  builtin exit 1
fi

if [ -z "$(command ls -A ${invenienda})" ]; then
  builtin echo 'Via inventa sed inanist'
  builtin exit 1
fi
