# Convergence blog

Posts for the [Convergence](https://www.convergescience.org) blog. Each post is written in
[MyST Markdown](https://mystmd.org/guide), previewed locally with the Curvenote CLI, and published to
the `convergence` site on [Curvenote](https://curvenote.com) by GitHub Actions. The Convergence
website reads published posts from Curvenote and shows them at `/blog`.

## Set up

You need [Node.js](https://nodejs.org) 18 or newer. Then install the Curvenote CLI:

```bash
npm install -g curvenote
curvenote --version
```

To run the same checks as the GitHub Actions (optional), log in with a Curvenote API token from
your Curvenote account settings:

```bash
curvenote token set
```

## Write a post

Each post is its own folder in `content/`, holding a `myst.yml`, an `index.md` and its images.
Shared settings (license, venue, authors and their affiliations) live in `content/convergence.yml`.

1. Copy the template into a new folder named for the date and topic:

   ```bash
   cp -r _template content/2027-01-15-short-name
   ```

2. Give it a new ID in `myst.yml` (`project.id`). This links the folder to its Curvenote
   submission, so **never change it once the post is published**:

   ```bash
   uuidgen | tr A-Z a-z
   ```

3. Fill in `myst.yml`: `title`, `description` (the listing card and share text), `date`, `authors`
   (ids from `content/convergence.yml`, or add yourself there) and `tags`.

4. Add a banner image (about 1200×630, also used as the share image) and set `banner` and `thumbnail` to its file name. Describe it in
   `parts: banner-alt:` in `index.md`'s frontmatter (its alt text).

5. Write the post in `index.md`.

### MyST Markdown

MyST is Markdown with extras for figures, callouts, cross-references and citations. See the
[MyST guide](https://mystmd.org/guide) for everything; the common pieces are:

```markdown
---
title: Post title
abstract: |
  A short lead paragraph, shown as a pull quote under the banner.
parts:
  banner-alt: What the banner image shows, read out by screen readers.
---

## A section

Images are files next to `index.md`, referenced by name:

:::{figure} figure.png
:label: fig-overview
:alt: What the image shows, for screen readers.
The caption.
:::

As shown in [](#fig-overview)...

:::{note}
A callout box.
:::
```

Keep images as files in the post folder. A Google Docs "Download → Markdown" export embeds them
as base64 (`![][image1]`); save each one as a file and reference it by name instead.

### Call to action

The `{cta}` directive (from `plugins/cta.mjs`) adds a full-width sign-up banner on the website.
The argument is the title and the body the description; `:kicker:` and `:button:` are optional:

```markdown
:::{cta} A convergence of science.
:kicker: Save the date
:button: Stay in the loop
Join us **June 16–18, 2027** in Montreal.
:::
```

In the local preview it shows as plain text; the website renders the banner and form.

## Preview locally

From the post's folder:

```bash
cd content/2027-01-15-short-name
curvenote start
```

Open <http://localhost:3000>. The page reloads as you edit. The preview uses a generic theme, so it
won't look exactly like the website, but the content, figures and any errors or warnings in the
terminal are the same.

To run the Curvenote checks the Actions run:

```bash
curvenote check convergence --kind blog --collection blog
```

## Publish

Publishing happens through GitHub; you don't run `curvenote submit` yourself.

1. Push your post on a branch and open a pull request to `main`.
2. The **content** workflow builds a draft of each changed post on Curvenote and comments on the
   PR with a preview link and the check results. Pushing more commits updates the draft.
3. Merge the PR. The **publish** workflow submits the post to the `convergence` site and publishes
   it straight away (there is no editorial review step on Curvenote, so review happens on the PR).
4. The post appears on the website's `/blog` within a few minutes.

To change a published post, edit it and go through the same PR → merge steps; Curvenote keeps the
earlier versions.

The post's URL on the website is its Curvenote slug (for example `/blog/2026-11-03-vital`), set on
the work in Curvenote. Until it has one, the URL uses the work's ID, which then redirects to the
slug once it's set.

The workflows are in `.github/workflows/` and use the `CURVENOTE_TOKEN` repository secret: an API
token for a Curvenote user who can submit and publish to the `convergence` site.
