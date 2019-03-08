import PixelIcon from "../src/pixel-icon"
import { replaceStringAt } from "./utils"

export default class Icon {

	public color = "0"

	private $icon = document.getElementById("my-icon")
	private code = ""

	private isPressed = false

	constructor(
		private onCodeChange: (c: string) => void
	) {}

	public render(code: string) {
		if (!this.$icon) return
		this.code = code
		PixelIcon.render(this.$icon, this.code)
		const img = (this.$icon.firstChild as HTMLElement)
		img.draggable = false
		img.onmousedown = this.onClick.bind(this)
		img.onmousemove = this.onMove.bind(this)
		img.onmouseleave = this.onRelease.bind(this)
		img.onmouseup = this.onRelease.bind(this)
	}

	private onClick(e: MouseEvent) {
		this.isPressed = true
		this.onMove(e)
	}

	private onRelease() {
		this.isPressed = false
	}	

	private onMove({ offsetX, offsetY }: MouseEvent) {
		if (!this.isPressed) return
		const x = Math.floor(offsetX / PixelIcon.size)
		const y = Math.floor(offsetY / PixelIcon.size)
		this.onCodeChange(replaceStringAt(this.code, y * PixelIcon.height + x, this.color))
	}
}