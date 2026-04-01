import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassModifier from "../components/ClassModifier.astro"

describe("ClassModifier", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the type as badge text", async () => {
    const html = await container.renderToString(ClassModifier, {
      props: {type: "static"},
    })

    expect(html).toContain("static")
  })

  it("applies the badge class with the type suffix", async () => {
    const html = await container.renderToString(ClassModifier, {
      props: {type: "async"},
    })

    expect(html).toContain("cb-badge cb-badge-async")
  })
})
