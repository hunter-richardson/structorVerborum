#!/bin/sh

sudo apt-get -y install secure-delete || exit
git checkout --orphan gh-pages || exit
npm run build || exit
git --work-tree build add --all || exit
git --work-tree commit -m 'expedire' || exit
printf 'Successu collectust\nInceptust expediri\n'
git push origin HEAD:gh-pages --force --verbose || exit
srm -dfrv -ll build
git checkout -f princeps || exit
git branch -D gh-pages || exit
printf 'Expeditust successu\n'
