# Contributing to @presidenttree94/form-utils
Thank you for your interest in contributing! This project is small but growing, and contributions of all kinds are welcome — bug fixes, new features, documentation improvements, examples, and feedback.

This guide explains how to set up the project, make changes, and submit pull requests.

## Project Structure
The repository is intentionally simple:
```
/src        -> Source TypeScript files
/dist       -> Build output (generated)
README.md   -> Main documentation
package.json
tsconfig.json
```
The core logic lives entirely in `/src`, and the build step outputs compiled JS + types into `/dist`.

## Getting Started
1. Fork & clone the repo
```
git clone https://github.com/PresidentTree94/form-utils.git
cd form-utils
```
2. Install dependencies
```
npm install
```
3. Start development
There is no dev server — this is a pure TypeScript library. To run a build:
```
npm run build
```

## Running Tests (coming soon)
This project currently has no tests.
If you'd like to help introduce Vitest or Jest (or however you do it), that contribution is very welcome.

Until then, please manually test changes using a small local React project or a CodeSandbox.

## Coding Guidelines
**TypeScript**
- Use strong typing everywhere.
- Prefer inferred types when possible.
- Avoid `any` unless absolutely necessary.

**Code style**
- Follow existing patterns in `src/`.
- Keep functions small and focused.
- Avoid unnecessary abstractions — this library aims to stay tiny and readable.

**Form behavior philosophy**
- Parsing should be predictable and explicit.
- Type inference should remain a core feature.
- API surface should stay minimal.

## Reporting Bugs
If you find a bug, please open an issue with:
- A clear description
- Steps to reproduce
- Expected vs. actual behavior
- Code snippet if applicable

## Suggesting Features
Feature requests are welcome! Please open an issue describing:
- The problem you’re trying to solve
- Why it belongs in this library
- Any API ideas you have