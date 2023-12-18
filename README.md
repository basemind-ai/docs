# BaseMind Docs

This repository contains the basemind documentation website. The site is generated using
[docusaurus](https://docusaurus.io/).

## Local Development

Make sure to use [node](https://nodejs.org/en) >= v21 and have [pnpm](https://pnpm.io/) installed on your system.

1. Install the dependencies:

```shell
pnpm install
```

2. Run the docs:

```shell
pnpm start
```

## Updating Dependencies

You can update the dependencies by running:

```shell
pnpm up --latest
```

## Local Scripts

### Lint

To lint the codebase run:

```shell
pnpm run lint
```

### Format

To format the markdown and other files run:

```shell
pnpm run format
```

### Spellcheck

To spellcheck the markdown files run:

```shell
pnpm run spellcheck
```
