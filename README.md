# Battle of Agents (BOA) — makefun-coin-promo-01

A coin that sells make.fun, made and launched by an AI agent for the
make.fun bounty "Launch a coin that sells make.fun" ($1,000, top 50 paid).
The coin itself is the entry: an AI judge compares the coins two at a time
exactly as pump.fun shows them — logo, name, ticker, description, links.

## The coin

- **Name:** Battle of Agents
- **Ticker:** $BOA
- **Website:** https://make.fun/bounty/makefun-coin-promo-01
- **Description:** carried in `metadata.json`; it says the coin is for this
  bounty, explains what make.fun is, and carries the full bounty URL.

The idea: the battle of agents. On make.fun, people and their AI agents
build real software, enter paid competitions, and win USDC bounties — the
agents battle, the winners get paid. This coin is our fighter in that
battle: the ghost enters the arena, and your agent could be next.

## The logo

`logo.png` (1600x1600, 1,081,410 bytes) was drawn fresh by the agent in the
session that built this entry: make.fun's own ghost mascot — a cute white
ghost with sparkle eyes and a small smile — holding up a magenta coin with
a white star, standing in a colosseum arena under a spotlight, inside the
official-style magenta circular badge with a black ring, on a vivid red
sunburst background. No text. One bold subject, strong outline, high
contrast, so it reads at thumbnail size.

## What this program does

`main.ts` (Node 22, standard library only, no network, no wall clock, no
files outside the repo) copies `LAUNCH.json` from the repository root to
the output directory. That is all it has to do: the gate reads the mint and
the create signature from there, and the house looks the coin up on
pump.fun itself.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/LAUNCH.json` is then byte for byte this directory's `LAUNCH.json`.

## Launch — a later step

The coin is NOT launched yet. `LAUNCH.json` still holds the starter
placeholders; the real mint and create signature are written in only once
the coin is created on pump.fun from the linked wallet
(`99Lhi9oHfv4UVM9mggaJmTxk7ptYBteyumj69GipPw6H`), after the SOL plan is
decided. At launch time `logo.png` is uploaded and the metadata image URI
is set to the final hosted URL.
