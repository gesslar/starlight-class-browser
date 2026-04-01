import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassExtends from "../components/ClassExtends.astro"

describe("ClassExtends", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the parent class name", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "BaseClass"},
    })

    expect(html).toContain("BaseClass")
    expect(html).toContain("cb-extends")
  })

  it("uses the default highlight and label", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Parent"},
    })

    expect(html).toContain("cb-hl-object")
    expect(html).toContain("extends")
  })

  it("accepts a custom highlight", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Parent", highlight: "type"},
    })

    expect(html).toContain("cb-hl-type")
    expect(html).not.toContain("cb-hl-object")
  })

  it("accepts a custom label", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Mixin", label: "mixes"},
    })

    expect(html).toContain("mixes")
  })

  it("renders source when provided", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Base", source: "src/base.ts"},
    })

    expect(html).toContain("cb-source")
    expect(html).toContain("src/base.ts")
  })

  it("omits source when not provided", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Base"},
    })

    expect(html).not.toContain("cb-source")
  })

  it("renders a target link when provided", async () => {
    const html = await container.renderToString(ClassExtends, {
      props: {name: "Base", target: "/api/base"},
    })

    expect(html).toContain("cb-target")
    expect(html).toContain("/api/base")
  })
})
