# PIXEL ICON JS
The simplest javascript icon editor.

## What is this?
It's a very simple library to create and render your own icons by just providing a codified string.

## How do I use it?
First, go to [the editor](https://samitier.github.io/pixel-icon/) and create an icon. Copy the resulting code to your project and the icon will render as an `img` tag.

## Options & advanced usage
You can pass an options object when rendering an icon. Here's a full feature example:

```js
import PixelIcon from "pixel-icon"

PixelIcon(yourContainer, yourIconCode, {
	// color palette of your image.
	colors: [
		"#000",
		"#47A8BD",
		"#9FD356",
		"#9C3848",
		"#FFF"
	],
	// if true, renders a border between each pixel to create a grid-like image 
	hasBorder: false, 
	// number of vertical and horizontal pixels
	size: 20
})
```
The properties `size` and `colors` will directly affect the size of the codified image as
it will need more characters to be rendered.
