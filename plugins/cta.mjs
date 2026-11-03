/**
 * A call to action: a kicker, a title and a description, rendered on the Convergence website as a
 * full-width "Keep me posted" sign-up block. Elsewhere it falls back to a plain paragraph, heading
 * and paragraph.
 *
 *     :::{cta} Be first to know.
 *     :kicker: Watch this space
 *     Full program. All speakers. Venue, travel, and registration coming soon.
 *     :::
 *
 * The kicker can also go inline: `:::{cta kicker="Watch this space"} Be first to know.`
 * `:button: Sign me up` changes the button's text (default "Keep me posted").
 *
 * Produces:
 *
 *     block[kind=cta] (data.button: the button text, when set)
 *       paragraph[kind=cta-kicker]
 *       heading[kind=cta-heading]
 *       paragraph[kind=cta-description]
 */

/** Inline content from a parsed `myst` value: a lone paragraph is unwrapped. */
function inline(nodes) {
  if (!nodes?.length) return undefined
  if (nodes.length === 1 && nodes[0].type === "paragraph") return nodes[0].children
  return nodes
}

const withoutPositions = (nodes) => JSON.stringify(nodes, (key, value) => (key === "position" ? undefined : value))

/**
 * mystmd (1.12) parses a `myst` option given inline (`{cta kicker="..."}`) twice, so its nodes
 * arrive repeated; keep one copy. The `:kicker:` form is unaffected.
 */
function once(nodes) {
  if (!nodes?.length || nodes.length % 2) return nodes
  const half = nodes.length / 2
  const first = nodes.slice(0, half)
  return withoutPositions(first) === withoutPositions(nodes.slice(half)) ? first : nodes
}

const ctaDirective = {
  name: "cta",
  doc: "A call to action with a sign-up form: the argument is the title, the body the description.",
  arg: {
    type: "myst",
    doc: "The title of the call to action.",
    required: true,
  },
  options: {
    kicker: {
      type: "myst",
      doc: "A short line above the title, e.g. `Watch this space`.",
    },
    button: {
      type: String,
      doc: 'The sign-up button\'s text; defaults to "Keep me posted".',
    },
  },
  body: {
    type: "myst",
    doc: "The description, under the title.",
  },
  run(data, vfile) {
    const kicker = inline(once(data.options?.kicker))
    const button = data.options?.button?.trim()
    const title = inline(data.arg)
    const body = data.body ?? []
    const description = inline(body.slice(0, 1))
    if (body.length > 1) {
      vfile.message("cta: only the first paragraph of the description is used", { node: data.node })
    }
    return [
      {
        type: "block",
        kind: "cta",
        ...(button ? { data: { button } } : {}),
        children: [
          kicker ? { type: "paragraph", kind: "cta-kicker", children: kicker } : undefined,
          { type: "heading", kind: "cta-heading", depth: 2, enumerated: false, children: title },
          description ? { type: "paragraph", kind: "cta-description", children: description } : undefined,
        ].filter(Boolean),
      },
    ]
  },
}

const plugin = { name: "Convergence call to action", directives: [ctaDirective] }

export default plugin
