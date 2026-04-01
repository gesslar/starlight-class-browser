import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassBrowser from "../components/ClassBrowser.astro"

describe("ClassBrowser", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the class name in the header", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "MyClass"},
    })

    expect(html).toContain("cb-header-name")
    expect(html).toContain("MyClass")
  })

  it("renders the browser wrapper", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
    })

    expect(html).toContain("cb-browser")
    expect(html).toContain("not-content")
  })

  it("renders a type badge when type is provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo", type: "class"},
    })

    expect(html).toContain("cb-badge cb-badge-class")
    expect(html).toContain("class")
  })

  it("uses default badge when type is not provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
    })

    expect(html).not.toContain("cb-badge")
  })

  it("renders source when provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo", source: "src/foo.ts"},
    })

    expect(html).toContain("cb-source")
    expect(html).toContain("src/foo.ts")
  })

  it("omits source when not provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
    })

    expect(html).not.toContain("cb-source")
  })

  it("sets the data-language attribute when provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo", language: "typescript"},
    })

    expect(html).toContain('data-language="typescript"')
  })

  it("renders a target link when provided", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo", target: "/api/foo"},
    })

    expect(html).toContain("cb-target")
    expect(html).toContain("/api/foo")
  })

  it("renders the copy-json button", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
    })

    expect(html).toContain("cb-copy-json")
    expect(html).toContain("Copy as JSON")
  })

  it("renders the toggle-all button", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
    })

    expect(html).toContain("cb-toggle-all")
  })

  it("renders slotted body content", async () => {
    const html = await container.renderToString(ClassBrowser, {
      props: {name: "Foo"},
      slots: {default: "<p>Class description here</p>"},
    })

    expect(html).toContain("cb-body")
    expect(html).toContain("Class description here")
  })
})
