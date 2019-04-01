import Encoder from "./encoder"
import { defaultOptions, Options } from "./options"

export default function render(element: any, code: string, options: Options = {}) {
	if (!element || !code) return
	const src = generateImageSrc(code, {...defaultOptions, ...options })
	if (element.nodeName === "IMG") {
		element.src = src
	}
	else {
		const img = document.createElement("img")
		img.src = src 
		element.innerHTML = ""
		element.append(img)
	}
}

function generateImageSrc(code: string, options: Options) {
	const canvas = document.createElement("canvas")
	canvas.width = options.width * options.size
	canvas.height = options.height * options.size
	const context = canvas.getContext("2d")
	if (context) {
		const encoder = new Encoder(options.colors.length)
		const squares = encoder.decode(code).split("")
		renderCanvasContext(context, squares, options)
	}
	return canvas.toDataURL("image/png")
}

function renderCanvasContext(
	context: CanvasRenderingContext2D,
	squares: string[] = [],
	options: Options
) {
	for (let h = 0; h < options.height; ++h) {
		for (let w = 0; w < options.width; ++w) {
			const colorValue = squares[options.height * h + w]
			context.fillStyle = getColor(colorValue, options.colors)
			const squareSize = options.size - options.borderSize
			context.fillRect(options.size * w, options.size * h, squareSize, squareSize)
		}
	}
}

function getColor(colorValue: string, colors: string[]) {
	const colorIdx = parseInt(colorValue, 10)
	if (colorIdx < 0 || colorIdx >= colors.length) {
		return ""
	}
	return colors[colorIdx]
}
