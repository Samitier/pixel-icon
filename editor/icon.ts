import Encoder from "../src/encoder"
import { defaultOptions, Options } from "../src/options"
import PixelIcon from "../src/pixel-icon"
import { replaceStringAt } from "./utils"

export default class Icon {

	public color = "0"

	private $icon = document.getElementById("my-icon")
	private code = ""
	private encoder = new Encoder(defaultOptions.colors.length)
	private isPressed = false
	private size = defaultOptions.size

	constructor(
		private onCodeChange: (c: string) => void
	) {}

	public render(code: string, options: Options) {
		if (!this.$icon) return
		this.code = code
		this.size = options.size || defaultOptions.size
		PixelIcon(this.$icon, this.code, { ...options, hasBorder: true })
		this.$icon.draggable = false
		this.$icon.onmousedown = this.onClick.bind(this)
		this.$icon.onmousemove = this.onMove.bind(this)
		this.$icon.onmouseleave = this.onRelease.bind(this)
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
		const x = Math.floor(offsetX / 20)
		const y = Math.floor(offsetY / 20)
		let code = this.encoder.decode(this.code)
		code = replaceStringAt(code, y * this.size + x, this.color)
		this.onCodeChange(this.encoder.encode(code))
	}
}