# NekoVision Technologies LLP Official Website

## Local development
- Ensure Ruby and Bundler are installed.
- Install dependencies: `bundle install`
- Run the site locally: `bundle exec jekyll serve --livereload`

## Adding a blog post
- Create a new Markdown file in `_posts` using the format `YYYY-MM-DD-your-blog.md`.
- Include front matter fields: `title`, `description`, `categories`, `thumbnail` (path under assets), `image` (used for share cards/SEO), and `permalink` if you want a custom URL.
- Store diagrams and images under `assets/blogs/<slug>/` and reference them with `{{ '/assets/blogs/<slug>/your-image.svg' | relative_url }}`.

## SEO and share cards
- `jekyll-seo-tag` is enabled; defaults live in `_config.yml` with `logo`/`image` fallbacks for Open Graph/Twitter.
- Per-post share image: set `image: /assets/blogs/<slug>/thumbnail.jpg` in front matter (matches `thumbnail`).

