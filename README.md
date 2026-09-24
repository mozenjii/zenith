# Mohib Ahmad — Portfolio

The source for my personal portfolio website.

**Live site:** [mohibahmad.pages.dev](https://mohibahmad.pages.dev)

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```sh
npm run build
```

The production build is a static export in `out/`. The build scripts prepare the site assets and Cloudflare Pages routing files, then check the exported output.

For Cloudflare Pages, use `npm run build` as the build command and `out` as the output directory. The repository also defines `npm run deploy` for a Wrangler CLI deployment; Wrangler must be installed and authenticated with the Cloudflare account first.
