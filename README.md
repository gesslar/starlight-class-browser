# @gesslar/starlight-class-browser

A Swagger-style API documentation component set for [Astro Starlight](https://starlight.astro.build/) sites. Renders class, method, property, and type documentation with theme-aware syntax highlighting — all in the light DOM.

## Features

- **Theme-aware highlighting** — resolves syntax colors from your Starlight theme at build time
- **Composable** — mix and match components to document any API shape
- **Light & dark mode** — full support with appropriate badge and highlight colors
- **Copy as JSON** — built-in button to export class definitions as structured JSON
- **Light DOM only** — no Shadow DOM, no slots indirection, your CSS just works

## Install

```sh
npm install @gesslar/starlight-class-browser
```

No Astro integration to register, no config to add.

## Usage

```mdx
import * as CB from "@gesslar/starlight-class-browser";

<CB.ClassBrowser name="MyClass" type="class" source="src/my-class.ts">
  Description of the class goes here.

  <CB.ClassExtends name="BaseClass" source="src/base.ts" />

  <CB.ClassProperty name="count" label="field">
    <CB.ClassPropertyType type="number" />
  </CB.ClassProperty>

  <CB.ClassMethod name="greet">
    Says hello.

    <CB.ClassMethodInput name="name" type="string">
      Who to greet
    </CB.ClassMethodInput>
    <CB.ClassMethodOutput type="string">
      The greeting message
    </CB.ClassMethodOutput>
  </CB.ClassMethod>
</CB.ClassBrowser>
```

## Components

| Component | Description |
|-----------|-------------|
| `ClassBrowser` | Top-level wrapper with header, badge, source, copy/expand buttons |
| `ClassExtends` | Inheritance indicator |
| `ClassProperty` | Property display with label and type slot |
| `ClassPropertyType` | Type annotation badge |
| `ClassMethod` | Collapsible method card with anchor links |
| `ClassMethodInput` | Parameter with name, type, description, and hint |
| `ClassMethodOutput` | Return type with description and hint |
| `ClassModifier` | Visibility/modifier badge (public, static, async, etc.) |

## Theme integration

Syntax highlight colors are automatically resolved from your Starlight theme at build time. The component checks for:

1. Starlight theme plugins (`starlight-theme-*` packages)
2. Starlight's bundled Night Owl themes (the default)
3. CSS fallback colors if no theme can be loaded

No configuration needed.

## Documentation

Full documentation with interactive examples: [starlight-class-browser.gesslar.dev](https://starlight-class-browser.gesslar.dev)

## License

`@gesslar/starlight-class-browser` is released under the [0BSD](LICENSE.txt).
