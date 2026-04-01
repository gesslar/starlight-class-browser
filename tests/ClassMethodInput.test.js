import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassMethodInput from "../components/ClassMethodInput.astro"

describe("ClassMethodInput", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the parameter name", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "userId"},
    })

    expect(html).toContain("userId")
    expect(html).toContain("cb-param")
  })

  it("shows the param label", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x"},
    })

    expect(html).toContain("cb-param-label")
    expect(html).toContain("param")
  })

  it("uses the default highlight", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x"},
    })

    expect(html).toContain("cb-hl-parameter")
  })

  it("accepts a custom highlight", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x", highlight: "variable"},
    })

    expect(html).toContain("cb-hl-variable")
  })

  it("renders the type annotation when provided", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x", type: "string"},
    })

    expect(html).toContain("cb-type-annotation")
    expect(html).toContain("string")
  })

  it("omits type annotation when not provided", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x"},
    })

    expect(html).not.toContain("cb-type-annotation")
  })

  it("applies typeHighlight to the type annotation", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x", type: "number", typeHighlight: "keyword"},
    })

    expect(html).toContain("cb-hl-keyword")
  })

  it("renders the description from the default slot", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x"},
      slots: {default: "The X coordinate"},
    })

    expect(html).toContain("cb-param-desc")
    expect(html).toContain("The X coordinate")
  })

  it("renders a hint when provided", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x", hint: "optional"},
    })

    expect(html).toContain("cb-hint")
    expect(html).toContain("optional")
    expect(html).toContain("cb-param-hinted")
  })

  it("renders a target link when provided", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x", target: "/api/x"},
    })

    expect(html).toContain("cb-target")
    expect(html).toContain("/api/x")
    expect(html).toContain("cb-param-hinted")
  })

  it("omits hint row when neither hint nor target", async () => {
    const html = await container.renderToString(ClassMethodInput, {
      props: {name: "x"},
    })

    expect(html).not.toContain("cb-hint-row")
    expect(html).not.toContain("cb-param-hinted")
  })
})
