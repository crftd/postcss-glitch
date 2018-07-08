# postcss-glitch
Glitch effect implemented with PostCSS

[![Build Status](https://travis-ci.org/crftd/postcss-glitch.svg?branch=master)](https://travis-ci.org/crftd/postcss-glitch)
[![Coverage Status](https://coveralls.io/repos/github/crftd/postcss-glitch/badge.svg?branch=master)](https://coveralls.io/github/crftd/postcss-glitch?branch=master)
[![Dependencies](https://david-dm.org/crftd/postcss-glitch.svg)](https://david-dm.org/)

![animation](http://g.recordit.co/COmXbvzGfg.gif)

Check out our [demo page](https://crftd.github.io/postcss-glitch/)

## Installation

```bash
yarn add postcss-glitch
```

You can use `.postcssrc.js` to add plugin to your project just like this:

```javascript
// .postcssrc.js

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-glitch": {},
    "postcss-url": {},
    "autoprefixer": {}
  }
}
```

### Usage

#### TL;DR

```
.foo {
  glitch: <height in px> <first color> <second color> <shadow size>;
}
```

#### Guide

1. Create a positioned element

```html
<div class="wrapper"></div>
```

```css
.wrapper {
  position: relative;
}
```

2. Create element which you want to apply glitch effect

```html
<div class="wrapper">
  <div class="glitch">PostCSS Glitch</div>
</div>
```

3. Add **data-text** attribute to the last created element

```html
<div class="wrapper">
  <div class="glitch" data-text="PostCSS Glitch">PostCSS Glitch</div>
</div>
```

```css
.wrapper {
  position: relative;
}
.glitch {
  font-weight: 700;
  font-size: 23pt;
  glitch: 42px #f00 #00f 2px;
}
```

## What actually happens?

```css
.glitch {
  font-weight: 700;
  font-size: 23pt;
  glitch: 42px #f00 #00f 2px;
}
```

transforms to

```css
@keyframes glitch-animation-before-data {
  0% {
    clip-path: inset(5px 0 32px 0)
  }
  25% {
    clip-path: inset(14px 0 23px 0)
  }
  50% {
    clip-path: inset(15px 0 22px 0)
  }
  75% {
    clip-path: inset(11px 0 26px 0)
  }
  to {
    clip-path: inset(18px 0 19px 0)
  }
}

@keyframes glitch-animation-after-data {
  0% {
    clip-path: inset(20px 0 17px 0)
  }
  25% {
    clip-path: inset(37px 0 0 0)
  }
  50% {
    clip-path: inset(16px 0 21px 0)
  }
  75% {
    clip-path: inset(20px 0 17px 0)
  }
  to {
    clip-path: inset(17px 0 20px 0)
  }
}

.wrapper {
  position: relative
}

.glitch {
  font-weight: 700;
  font-size: 23pt;
}

.glitch:after,.glitch:before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  clip-path: inset(42px 0 0 0)
}

.glitch:before {
  text-shadow: -2px 0 red;
  animation: glitch-animation-before-data 3s infinite linear alternate-reverse
}

.glitch:after {
  text-shadow: 2px 0 #00f;
  animation: glitch-animation-after-data 2s infinite linear alternate-reverse
}
```

And yeah it also works with CSSModules!

## Deployment

### GitHub Pages

To encrypt gh pages key for repo do

```bash
travis encrypt -r crftd/postcss-glitch --org
```

## Contributing
PR's are welcome 👍
