# postcss-glitch

Glitch effect implemented with PostCSS. With this plugin you can easily add glitch effect to any text!

[![npm version](https://badge.fury.io/js/postcss-glitch.svg)](https://badge.fury.io/js/postcss-glitch)
[![CircleCI](https://circleci.com/gh/crftd/postcss-glitch/tree/master.svg?style=svg)](https://circleci.com/gh/crftd/postcss-glitch/tree/master.svg?style=svg)

![animation](http://g.recordit.co/COmXbvzGfg.gif)

Check out our [demo page](https://crftd.github.io/postcss-glitch/) ([source](https://github.com/crftd/postcss-glitch-demos))

## Installation

```bash
yarn add postcss-glitch
```

You can use `.postcssrc.js` to add plugin to your project just like this:

```javascript
// .postcssrc.js

module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-glitch': {},
		'postcss-url': {},
		autoprefixer: {},
	},
};
```

### Usage

#### TL;DR

```
.foo {
  glitch: <height in px | pt | % | em | rem > <first color> <second color> <shadow size>;
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
@keyframes glitch-animation-before {
	0% {
		clip-path: inset(5px 0 32px 0);
	}
	25% {
		clip-path: inset(14px 0 23px 0);
	}
	50% {
		clip-path: inset(15px 0 22px 0);
	}
	75% {
		clip-path: inset(11px 0 26px 0);
	}
	to {
		clip-path: inset(18px 0 19px 0);
	}
}

@keyframes glitch-animation-after {
	0% {
		clip-path: inset(20px 0 17px 0);
	}
	25% {
		clip-path: inset(37px 0 0 0);
	}
	50% {
		clip-path: inset(16px 0 21px 0);
	}
	75% {
		clip-path: inset(20px 0 17px 0);
	}
	to {
		clip-path: inset(17px 0 20px 0);
	}
}

.wrapper {
	position: relative;
}

.glitch {
	font-weight: 700;
	font-size: 23pt;
}

.glitch:after,
.glitch:before {
	content: attr(data-text);
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	clip-path: inset(42px 0 0 0);
}

.glitch:before {
	text-shadow: -2px 0 #f00;
	animation: glitch-animation-before 3s infinite linear alternate-reverse;
}

.glitch:after {
	text-shadow: 2px 0 #00f;
	animation: glitch-animation-after 2s infinite linear alternate-reverse;
}
```

And yeah it also works with CSSModules!

## Contributing

PR's are welcome 👍
