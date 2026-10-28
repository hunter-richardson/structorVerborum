#!/usr/bin/fish

if not set -v GITHUB_ACTIONS && string match -er '^0{40}$' $argv[1]
  curl -fsSL https://vite.plus | VP_NODE_MANAGER=yes sh;
    or exit
  set conf $XDG_CONFIG_HOME/vite-plus
  test -f $conf/env.fish;
    and source $conf/env.fish;
    or sh $conf/env.sh
    or exit
  vp env default;
    and npx get-pnpm;
    and pnpm install
end
