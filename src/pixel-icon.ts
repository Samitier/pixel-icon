import Encoder from "./encoder"

class PixelIcon {

	public readonly width = 8
	public readonly height = 8

	public readonly size = 20

	public readonly colors = [
		"#000",
		"#47A8BD",
		"#9FD356",
		"#9C3848",
		"#FFF"
	]

	private encoder = new Encoder(this.colors.length)

	public render(element: HTMLElement, code: string, options: Options = {}) {
		const img = document.createElement("img")
		img.src= this.generateImageSrc(code, options)
		element.innerHTML = ""
		element.append(img)
	}

	private generateImageSrc(code: string, options: Options) {
		const canvas = document.createElement("canvas")
		canvas.width = this.width * this.size
		canvas.height = this.height * this.size
		const context = canvas.getContext("2d")
		if (context) {
			const squares = this.encoder.decode(code).split("")
			this.renderCanvasContext(context, squares, options)
		}
		return canvas.toDataURL("image/png")
	}

	private renderCanvasContext(
		context: CanvasRenderingContext2D,
		squares: string[] = [],
		options: Options
	) {
		for (let h = 0; h < this.height; ++h) {
			for (let w = 0; w < this.width; ++w) {
				const colorValue = squares[this.height * h + w]
				context.fillStyle = this.getColor(colorValue)
				const squareSize = this.size - (options.borderSize ? options.borderSize : 0)
				context.fillRect(this.size * w, this.size * h, squareSize, squareSize)
			}
		}
	}

	private getColor(colorValue: string) {
		const colorIdx = parseInt(colorValue, 10)
		if (colorIdx < 0 || colorIdx >= this.colors.length) {
			return ""
		}
		return this.colors[colorIdx]
	}
}

interface Options {
	borderSize?: number
}

export default new PixelIcon()