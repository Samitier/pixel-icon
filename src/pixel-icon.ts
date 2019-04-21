import Encoder from "./encoder"
import { defaultOptions, Options } from "./options"

const squareSize = 20

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
	canvas.width = canvas.height = options.size * squareSize
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
	for (let h = 0; h < options.size; ++h) {
		for (let w = 0; w < options.size; ++w) {
			const colorValue = squares[options.size * h + w]
			context.fillStyle = getColor(colorValue, options.colors)
			if (options.hasBorder) {
				context.strokeStyle = "#FFF"
				context.strokeRect(squareSize * w, squareSize * h, squareSize, squareSize)
			}
			context.fillRect(squareSize * w, squareSize * h, squareSize, squareSize)
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
