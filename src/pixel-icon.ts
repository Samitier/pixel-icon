class PixelIcon {

	public readonly width = 8
	public readonly height = 8

	public readonly size = 25

	public readonly colors = [
		"#000",
		"#1E3888",
		"#47A8BD",
		"#9FD356",
		"#9C3848",
		"#FFF"
	]

	public render(element: HTMLElement, code: string) {
		const img = document.createElement("img")
		img.src= this.generateImageSrc(code)
		element.innerHTML = ""
		element.append(img)
	}

	private generateImageSrc(code: string) {
		const canvas = document.createElement("canvas")
		canvas.width = this.width * this.size
		canvas.height = this.height * this.size
		const context = canvas.getContext("2d")
		if (context) {
			this.renderCanvasContext(context, code.split(""))
		}
		return canvas.toDataURL("image/png")
	}

	private renderCanvasContext(context: CanvasRenderingContext2D, squares: string[] = []) {
		for (let h = 0; h < this.height; ++h) {
			for (let w = 0; w < this.width; ++w) {
				const colorValue = squares[this.height * h + w]
				context.fillStyle = this.getColor(colorValue)
				context.fillRect(this.size * w, this.size * h, this.size - 1, this.size - 1)
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

export default new PixelIcon()