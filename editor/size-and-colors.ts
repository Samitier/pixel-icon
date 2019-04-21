import { defaultOptions, Options } from "../src/options"

export default class SizeAndColors {

	private readonly maxSize = 14;
	private readonly minSize = 2;
	private $size = document.getElementById("size") as HTMLInputElement
	private $customColors = document.getElementById("custom-colors")

	private options = { size: defaultOptions.size, colors: [...defaultOptions.colors] }

	constructor(
		private onOptionsChange: (o: Options) => void
	) {
		this.$size.value = defaultOptions.size.toString()
		this.$size.onchange = () => {
			this.$size.value = this.checkSizeLimits(this.$size.value)
			this.options.size = +this.$size.value
			this.onOptionsChange(this.options)
		}
		this.$customColors.innerHTML = ""
		defaultOptions.colors
			.map((c, i) => this.renderColorElem(c, i))
			.forEach(c => this.$customColors.appendChild(c))
	}

	private renderColorElem(color: string, index: number) {
		const colorShow = document.createElement("a")
		colorShow.style.background = color
		if (color === "#00000000") colorShow.classList.add("color-transparent")
		const input = document.createElement("input")
		input.value = color
		input.onchange = (e: any) => {
			const isCorrectColor = /^#([0-9a-f]{3}){1,2}$/i.test(e.target.value)
			if (!isCorrectColor) e.target.value = defaultOptions.colors[index]
			this.options.colors[index] = e.target.value
			colorShow.style.background = e.target.value
			this.onOptionsChange(this.options)
		}
		const container = document.createElement("div")
		container.append(colorShow, input)
		return container
	}

	private checkSizeLimits(value: string) {
		return Math.max(Math.min(+value, this.maxSize), this.minSize).toString()
	}
}