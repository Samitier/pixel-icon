import PixelIcon from "../src/pixel-icon"

export default class ColorPicker {

	private $container: any = document.getElementById("my-colors")

	private selectedElem = 0

	constructor(
		private onSelectColor: (c: string) => void
	) {
		this.render()
	}

	private render() {
		this.$container.innerHTML = ""
		PixelIcon.colors
			.map((c, i) => this.renderColorElem(c, i))
			.forEach(c => this.$container.appendChild(c))
	}

	private renderColorElem(color: string, index: number) {
		const anchor = document.createElement("a")
		anchor.style.background = color
		anchor.dataset.color = index.toString()
		if (this.selectedElem === index) anchor.classList.add("selected")
		anchor.onclick = this.onClickColor.bind(this)
		return anchor
	}

	private onClickColor(e: any) {
		this.selectedElem = parseInt(e.target.dataset.color, 10)
		this.onSelectColor(e.target.dataset.color)
		this.render()
	}
}