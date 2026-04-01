import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassPropertyType from "../components/ClassPropertyType.astro"

describe("ClassPropertyType", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the type text", async () => {
    const html = await container.renderToString(ClassPropertyType, {
      props: {type: "string"},
    })

    expect(html).toContain("string")
  })

  it("uses the default highlight class", async () => {
    const html = await container.renderToString(ClassPropertyType, {
      props: {type: "number"},
    })

    expect(html).toContain("cb-hl-type")
  })

  it("accepts a custom highlight prop", async () => {
    const html = await container.renderToString(ClassPropertyType, {
      props: {type: "number", highlight: "keyword"},
    })

    expect(html).toContain("cb-hl-keyword")
    expect(html).not.toContain("cb-hl-type")
  })

  it("includes the type-annotation class", async () => {
    const html = await container.renderToString(ClassPropertyType, {
      props: {type: "boolean"},
    })

    expect(html).toContain("cb-type-annotation")
  })
})
