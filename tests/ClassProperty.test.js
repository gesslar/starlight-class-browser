import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassProperty from "../components/ClassProperty.astro"

describe("ClassProperty", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the property name", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "count"},
    })

    expect(html).toContain("count")
    expect(html).toContain("cb-property")
  })

  it("uses the default highlight and label", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "items"},
    })

    expect(html).toContain("cb-hl-variable")
    expect(html).toContain("prop")
  })

  it("accepts a custom highlight", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "items", highlight: "keyword"},
    })

    expect(html).toContain("cb-hl-keyword")
    expect(html).not.toContain("cb-hl-variable")
  })

  it("accepts a custom label", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "count", label: "field"},
    })

    expect(html).toContain("field")
  })

  it("renders a target link when provided", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "count", target: "/api/count"},
    })

    expect(html).toContain("cb-target")
    expect(html).toContain("/api/count")
  })

  it("omits target link when not provided", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "count"},
    })

    expect(html).not.toContain("cb-target")
  })

  it("renders slotted children", async () => {
    const html = await container.renderToString(ClassProperty, {
      props: {name: "count"},
      slots: {default: '<span class="cb-type-annotation">number</span>'},
    })

    expect(html).toContain("cb-type-annotation")
    expect(html).toContain("number")
  })
})
