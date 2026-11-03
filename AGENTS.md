# Convergence blog

Posts for the Convergence blog, published to the `convergence` Curvenote site and shown on the Convergence website's Updates page at `/updates`.

<!-- curvenote-actions:start -->

## Publishing (Curvenote GitHub Actions)

One post per folder under `content/` (configuration B, "merge means accepted"). The starter post
is `_template/` at the repository root, outside `content/`, so it is never built or submitted.

- **Site:** venue `convergence`, collection `blog`, kind `blog`, path `content/*`.
- **IDs:** each post's `myst.yml` has a UUID `project.id` (the default pattern, `^([a-zA-Z0-9-]{36})$`). It links the folder to its Curvenote submission: **never change it once submitted.**
- `.github/workflows/content.yml` runs on every pull request to `main`: builds a preview and runs the Curvenote checks for the changed post, reported in a PR comment. Only changed post folders are built; PRs that change nothing under `content/` build nothing.
- `.github/workflows/publish.yml` runs on every push to `main`: submits each changed post and **publishes it immediately, with no review** (`publish: true`).
- Both pin `curvenote/actions@v1` and use the `CURVENOTE_TOKEN` repository secret, a Curvenote API token for a user on the `convergence` site who can submit and publish.

### Adding a post

1. Copy `_template/` to `content/YYYY-MM-DD-short-name/` and give it a new `project.id` (`uuidgen | tr A-Z a-z`).
2. Write `index.md`. Images are files committed next to the post and referenced by name (`![](figure.png)`), never embedded as base64. A Google Docs "Download → Markdown" export embeds them, so save each one as a file and replace the `![][image1]` references before committing.
3. Set `banner` (≈1200×630, also the share image), `description`, `authors` and `tags` in `myst.yml`. Give the banner alt text in `index.md` frontmatter as `parts: banner-alt:` (MyST has no banner-alt field; the website reads this part).
4. Open a PR, check the preview, merge.

The post's URL slug on the site is set in Curvenote, not here; without one the site uses the work id.

### Call to action

`plugins/cta.mjs` (loaded for every post from `content/convergence.yml`) adds a `{cta}` directive: a
sign-up banner on the Convergence website. The argument is the title, the body the description, with
optional `:kicker:` and `:button:` (the button text, default "Keep me posted"):

```markdown
:::{cta} A convergence of science.
:kicker: Save the date
:button: Stay in the loop
Join us **June 16–18, 2027** in Montreal.
:::
```

More: <https://github.com/curvenote/actions> and the Curvenote docs (CLI → Automation → GitHub
Actions).

<!-- curvenote-actions:end -->
