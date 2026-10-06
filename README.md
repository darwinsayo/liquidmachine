# liquidmachine.com

Static one-page site. No build step. Publish the folder as-is.

## Cloudflare Pages (recommended)

Option A, connect GitHub (same as your other sites):
1. Push this folder to a GitHub repo.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Pick the repo. Framework preset: None. Build command: leave empty. Output directory: `/`.
4. Deploy, then Custom domains > add liquidmachine.com (and www).

Option B, direct upload (no GitHub):
1. Workers & Pages > Create > Pages > Upload assets.
2. Drag in this folder (or liquidmachine-site.zip), name the project, deploy.

## Placeholder to replace before launch
- `hello@liquidmachine.com` in index.html (contact box). Search for it and swap in the real address.
