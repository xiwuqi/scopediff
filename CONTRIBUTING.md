# Contributing

Thanks for helping improve ScopeDiff.

## Local Setup

```bash
npm install
npm run check
```

## Development

Run the CLI from source:

```bash
npm run dev -- scan
```

Run tests:

```bash
npm test
```

## Rule Contributions

Good ScopeDiff rules are:

- Conservative and explainable.
- Backed by fixtures.
- Clear about false positives.
- Focused on review-worthy capability changes.

Please include:

- A short rule explanation.
- At least one positive fixture.
- At least one negative or false-positive fixture when practical.
- Suggested review wording.

## Pull Requests

Before opening a PR:

```bash
npm run check
```

ScopeDiff should not add telemetry, hidden network calls, credential collection, or automatic PR comments by default.
