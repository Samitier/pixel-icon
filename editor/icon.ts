import Encoder from "../src/encoder"
import { defaultOptions } from "../src/options"
import PixelIcon from "../src/pixel-icon"
import { replaceStringAt } from "./utils"

export default class Icon {

	public color = "0"

	private $icon = document.getElementById("my-icon")
	private code = ""
	private encoder = new Encoder(defaultOptions.colors.length)
	private isPressed = false

	constructor(
		private onCodeChange: (c: string) => void
	) {}

	public render(code: string) {
		if (!this.$icon) return
		this.code = code
		PixelIcon(this.$icon, this.code, { borderSize: 1 })
		const img = (this.$icon.firstChild as HTMLElement)
		img.draggable = false
		img.onmousedown = this.onClick.bind(this)
		img.onmousemove = this.onMove.bind(this)
		img.onmouseleave = this.onRelease.bind(this)
		document.addEventListener("mouseup", this.onRelease.bind(this))
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
		const x = Math.floor(offsetX / defaultOptions.size)
		const y = Math.floor(offsetY / defaultOptions.size)
		let code = this.encoder.decode(this.code)
		code = replaceStringAt(code, y * defaultOptions.height + x, this.color)
		this.onCodeChange(this.encoder.encode(code))
	}
}