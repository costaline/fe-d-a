# File-based Routing

---

Similar to [next.js routing](https://nextjs.org/docs/routing/introduction)

## Important

Do not reexport from parent dir

## Features

### Component `FileBasedRouting`

#### lazy variant

- preloaded pages (prop `preloaded`)

- fallback while loading (prop `fallback`)

### Object `routes`

```javascript
{
  ROUTE_NAME: {
    // JSX component
    Component
    // function to preload component
    preload
    // relative path from pages dir
    //   articles/[article].tsx
    filePath
    //   /articles/:article
    routePath
    // tagged template function to create dynamic path
    //   ROUTE_NAME.templatePath`${foo}${bar}`
    //   /articles/foo/authors/bar
    templatePath
  }
}
```
### Other

- custom pages directory: `REACT_APP_PAGES_DIR=pages`

	(use it with import from `lazyConfigurable` of `syncConfigurable`)

