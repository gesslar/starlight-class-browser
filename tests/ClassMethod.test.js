import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassMethod from "../components/ClassMethod.astro"

describe("ClassMethod", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders a details element with the method name as id", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "greet"},
    })

    expect(html).toContain('<details class="cb-method"')
    expect(html).toContain('id="greet"')
  })

  it("renders the method name with default highlight", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "doStuff"},
    })

    expect(html).toContain("cb-hl-function")
    expect(html).toContain("doStuff")
  })

  it("accepts a custom highlight", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "doStuff", highlight: "support"},
    })

    expect(html).toContain("cb-hl-support")
    expect(html).not.toContain("cb-hl-function")
  })

  it("renders closed by default", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "greet"},
    })

    expect(html).not.toMatch(/open/)
  })

  it("renders open when prop is set", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "greet", open: true},
    })

    expect(html).toContain("open")
  })

  it("renders an anchor link", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "fetch"},
    })

    expect(html).toContain('href="#fetch"')
    expect(html).toContain("cb-anchor")
  })

  it("renders the default slot as method body", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "greet"},
      slots: {default: "<p>Says hello.</p>"},
    })

    expect(html).toContain("cb-method-body")
    expect(html).toContain("Says hello.")
  })

  it("renders the modifiers slot", async () => {
    const html = await container.renderToString(ClassMethod, {
      props: {name: "greet"},
      slots: {modifiers: '<span class="cb-badge cb-badge-async">async</span>'},
    })

    expect(html).toContain("cb-badge-async")
  })
})
