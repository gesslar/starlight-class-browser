import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import TargetLink from "../components/TargetLink.astro"

describe("TargetLink", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders a link with the target as href", async () => {
    const html = await container.renderToString(TargetLink, {
      props: {target: "/api/foo"},
    })

    expect(html).toContain('href="/api/foo"')
    expect(html).toContain("cb-target")
  })

  it("adds external attributes for http URLs", async () => {
    const html = await container.renderToString(TargetLink, {
      props: {target: "https://example.com"},
    })

    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it("does not add external attributes for relative URLs", async () => {
    const html = await container.renderToString(TargetLink, {
      props: {target: "/local/path"},
    })

    expect(html).not.toContain('target="_blank"')
    expect(html).not.toContain("noopener")
  })

  it("includes the svg icon", async () => {
    const html = await container.renderToString(TargetLink, {
      props: {target: "/foo"},
    })

    expect(html).toContain("<svg")
    expect(html).toContain("aria-hidden")
  })
})
