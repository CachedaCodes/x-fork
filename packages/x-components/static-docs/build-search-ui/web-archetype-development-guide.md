---
title: Interface X Archetype Development
tags:
  - development
  - archetype
  - X Components archetype development
  - x development
  - interface x
  - x components
  - archetype development
  - archetype integration
---

# Interface X Archetype Development

In this tutorial, you’ll learn how to start developing with the Interface&nbsp;X&nbsp;Archetype
project in your store in a matter of minutes, so you can create a search interface layer based on
predefined features and components.

For this tutorial, the Empathy Search API is used, but you can use any search API. This guide
requires knowledge of JavaScript and Vue.js.

::: note Before you begin

To integrate Interface&nbsp;X&nbsp;Archetype as a search UI layer, you need:

- **Empathy Search API** (or any search API that you use to retrieve search data).
- **Empathy Search Adapter** to communicate with the Empathy Search API (or any search adapter to
  connect with the search API you are using).

:::

##### Steps to start developing in a X Archetype project:

1. **Clone** the X&nbsp;Archetype project and **initialize** your repository.
2. Install the **project dependencies** and execute the project.
3. Configure the **search adapter**.
4. Configure the **xPlugin**.

## 1. Clone the project and initialize your repository

Clone the [X Archetype project](https://github.com/empathyco/x-archetype.git) from the GitHub
repository to your target folder. You need a non-initialized repository, so make sure you remove the
git folder from the cloned project.

```batch
// Clone the X Archetype project from GitHub
git clone --depth 1 https://github.com/empathyco/x-archetype.git <your-target-folder>

// Remove the git folder
rm -rf .git
```

::: develop

You can use [Degit](https://github.com/Rich-Harris/degit) to clone the git repository without
downloading the entire git history:
`npx degit https://github.com/empathyco/x-archetype.git <your-target-folder>`.

:::

Once you have cloned the project and removed the git history from the project, initialize the
repository from the root directory.

```batch
// Initialize the repository
git init
git remote add origin <your-repository-url>
git add .
git commit -m "Initial X-Components Setup"
git push -u origin main
```

Then, replace the current repository name (`@empathyco/x-archetype`) with the name of your
repository in the `package.json` file.

```json
// Define your repository
{
   "name": "<your-repo>",
   "author": "Empathy Systems Corporation S.L.",
   …
 }

```

## 2. Install the dependencies and execute the project

Install the project dependencies via `npm` in the root folder of your cloned repository. Then, you
can run the project.

```batch
// Install the dependencies via npm
npm install

// Execute the project
npm run serve
```

::: interact For a full list of the project dependencies, check the
[`package.json`](https://github.com/empathyco/x-archetype/blob/main/package.json) file in the
Interface&nbsp;X&nbsp;Archetype repository. :::

## 3. Configure the search adapter

Before using your project, configure the Empathy Search Adapter in the
`x-archetype/src/adapter/adapter.ts` file, using the Empathy Adapter Builder to make it work with
the Empathy Search API. The Empathy Search Adapter contains a sample configuration for setup, global
configurations, or mappers that points to a demo environment. You need to make some adjustments in
the configuration according to the search features you use in your project.

Export the required search adapter with your configuration as you will need it for the search
[xPlugin configuration](web-archetype-integration-guide.md#_4-configure-the-plugin).

::: interact For detailed information about other configuration options in the Empathy Search
Adapter, go to the
[x-adapter repository](https://github.com/empathyco/x/tree/main/packages/search-adapter). :::

::: note Although you configure the values for the `instance`, `language`, `scope`, and `endpoint`
options when integrating the project, you can still change these values when the project is
deployed. Use the `/x-archetype/public/snippet-script.js` file to perform hot changes for `lang`,
`store`, `device`, and `catalog` parameters.

For example, you may configure the adapter to use EN as `lang` so that when you search, the results
are displayed in English. However, if you want to deploy the application in Spain, you want the
`lang` to be ES. You change these values in the `snippet-script.js` file.

:::

## 4. Configure the plugin

The `xPlugin` initializes the properties needed by the X&nbsp;Components. It has key options that
you can configure in the `/x-archetype/src/x-components/plugin.options.ts` file.

Since the X&nbsp;Archetype project operates as a layer and is designed to be integrated on top of
any kind of website regardless the chosen technology, the `XInstaller` utility and its
`installXOptions` object are designed to install the xPlugin, adding the connection between the
X&nbsp;Components and the search API and bootstrapping the entire application with powerful APIs
that are available in the `window.X` object.

To configure the xPlugin, run this code:

```typescript
import { InstallXOptions, XInstaller } from '@empathyco/x-components';
import App from './App.vue';
import store from './store';
import { adapter } from '../adapter';

export const installXOptions: InstallXOptions = {
  adapter,
  store,
  app: App
};

new XInstaller(installXOptions).init({
  instance: '<your-search-api-instance>',
  lang: '<your-application-language>',
  scope: '<your-application-scope>'
});
```

---

### Next steps

Once you have your Interface&nbsp;X&nbsp;Archetype project, you're ready to integrate it in your
store, or extend the search and discovery experience to meet your business needs:

- [Integrate an Interface&nbsp;X&nbsp;Archetype project into an existing website](web-archetype-integration-guide.md).
- Change the configuration of [X Components](web-use-x-components-guide.md) or create new ones.
- Adapt the
  [design system](https://github.com/empathyco/x/blob/main/packages/x-components/contributing/design-system.md)
  to your branding.
- Manage
  [internationalization options](https://github.com/empathyco/x-archetype/blob/main/docs/i18n.md) to
  support different languages.

<!-- add links to design system and internationalization content pages when ready-->