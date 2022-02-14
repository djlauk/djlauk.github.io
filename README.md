# djlauk.github.io

This is my personal user GitHub pages repo.

The source code to my tools is licensed under the [MIT license](LICENSE.md).

## Notes for future me

I created this as a svelte-kit application using the skeleton from [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

In a nuthsell this is how I set things up:

- `pnpm create svelte@next` (Note: the `@next` is temporary -- until svelte-kit hits 1.0, I guess)
  - Yes to TypeScript
  - Yes to ESlint
  - Yes to Prettier
- `pnpx svelte-add@latest tailwindcss`
- `pnpm install -D @sveltejs/adapter-static@next`
- edit `svelte.config.js`: use `adapter-static` and configure bulids to go to `./docs/` (required for GitHub pages).
- **!** don't add `./docs/` to `.gitignore`! (required for deploying to GitHub pages)

### Develop locally

- `pnpm run dev` for local development webserver with HMR
- `pnpm run lint` to check the project for problems
- `pnpm run build` to run a build
- `pnpm run preview` to try out the built site

### Deploy to GitHub pages

- `pnpm run build`
- `git add docs/`
- `git commit`
- `git push`
