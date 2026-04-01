import {describe, it, expect, beforeAll} from "vitest"
import {experimental_AstroContainer as AstroContainer} from "astro/container"
import ClassMethodOutput from "../components/ClassMethodOutput.astro"

describe("ClassMethodOutput", () => {
  let container

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders the return type", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "string"},
    })

    expect(html).toContain("string")
    expect(html).toContain("cb-returns")
  })

  it("shows the returns label", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "void"},
    })

    expect(html).toContain("cb-returns-label")
    expect(html).toContain("returns")
  })

  it("uses the default highlight", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "number"},
    })

    expect(html).toContain("cb-hl-type")
    expect(html).toContain("cb-returns-type-name")
  })

  it("accepts a custom highlight", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "number", highlight: "keyword"},
    })

    expect(html).toContain("cb-hl-keyword")
  })

  it("renders the description from the default slot", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "string"},
      slots: {default: "The greeting message"},
    })

    expect(html).toContain("cb-returns-desc")
    expect(html).toContain("The greeting message")
  })

  it("omits description when no slot content", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "void"},
    })

    expect(html).not.toContain("cb-returns-desc")
  })

  it("renders a hint when provided", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "Promise", hint: "async"},
    })

    expect(html).toContain("cb-hint")
    expect(html).toContain("async")
    expect(html).toContain("cb-returns-hinted")
  })

  it("renders a target link when provided", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "Result", target: "/api/result"},
    })

    expect(html).toContain("cb-target")
    expect(html).toContain("/api/result")
  })

  it("omits hint row when neither hint nor target", async () => {
    const html = await container.renderToString(ClassMethodOutput, {
      props: {type: "void"},
    })

    expect(html).not.toContain("cb-hint-row")
    expect(html).not.toContain("cb-returns-hinted")
  })
})
