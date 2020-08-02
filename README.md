# postcss-glitch

[![CircleCI](https://circleci.com/gh/crftd/postcss-glitch/tree/master.svg?style=svg)](https://circleci.com/gh/crftd/postcss-glitch/tree/master.svg?style=svg)

Glitch effect implemented with PostCSS. With this plugin you can easily add glitch effect to any text!

![animation](http://g.recordit.co/COmXbvzGfg.gif)

Check out our [demo page](https://crftd.github.io/postcss-glitch/) ([source](https://github.com/crftd/postcss-glitch-demos))

---

This is a monorepo for a PostCSS Glitch project. 
It contains both plugin source code and various demo projects that use the plugin. 

## Working with the repo

> **NOTE:** The following documentation describes how to work with this repo.
> You can find plugin documentation [here](plugin/README.md).
>
> Also, take a look at [demos](demos) directory if you are looking for working examples of how to use postcss-glitch plugin. 

### Pre-requirements

It's recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

[NodeJS](https://nodejs.org/)

```bash
nvm install 14 && nvm use 14
```

[Yarn](https://yarnpkg.com/)

```bash
npm i -g yarn
```

Since this repo is using [Zero-Installs](https://yarnpkg.com/features/zero-installs) no further setup is required.

### Workspaces

This project is a monorepo containing multiple projects a.k.a workspaces.
Workspaces are defined in the root [package.json](package.json).
Here we have a workspace under [plugin](plugin) directory, additionally each directory under [demos](demos) is also considered a workspace.

```json
{
    "workspaces": [
        "plugin",
        "demos/*"
      ]
}
```

This allows, for example, to install all the dependencies at once for both plugin and all of the demo projects while running `yarn install` in the root folder.

You can learn more about managing monorepo with yarn workspaces in the [documentation](https://yarnpkg.com/features/workspaces).


### Install dependencies

```bash
yarn install
```

Please add everything created under `.yarn` directory to git as [Zero-Installs](https://yarnpkg.com/features/zero-installs) requires.

```bash
git add .yarn
```

### Contributing

If you want to start contributing to this project, please read the [CONTRIBUTING.md](CONTRIBUTING.md). 


