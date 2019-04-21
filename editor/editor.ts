import { defaultOptions, Options } from "../src/options"
import PixelIcon from "../src/pixel-icon"
import ColorPicker from "./color-picker"
import Icon from "./icon"
import SizeAndColors from "./size-and-colors"

class Editor {

	private icon = new Icon(c => this.code = c)
	private colorPicker = new ColorPicker(c => this.icon.color = c, defaultOptions.colors)
	private sizeAndColors = new SizeAndColors((o) => this.options = o)
	private $myCode = document.getElementById("my-code")
	private $titleIcon = document.getElementById("title-icon")
	private $myOptions = document.getElementById("my-options")

	private _code = ""
	get code() { return this._code }
	set code(c: string) {
		this._code = c
		this.icon.render(this.code, this.options)
		if (this.$myCode) {
			this.$myCode.innerHTML = `\`${ this.code }\`${ this.hasCustomSizeOrColors ? "," : "" }`
		}
		if (this.$titleIcon) PixelIcon(this.$titleIcon, this.code, this.options)
	}

	private _options = { ...defaultOptions } as Options
	get options() { return this._options }
	set options(o: Options) {
		this._options = o
		this.colorPicker.colors = o.colors
		this.colorPicker.render()
		if (this.$myOptions) {
			this.$myOptions.innerHTML = `{ size: ${ o.size }, colors: [${ o.colors.join(", ") }] }`
			this.$myOptions.style.display = this.hasCustomSizeOrColors ? "block" : "none"
		}
		let code = "0"
		for (let i = Math.ceil(o.size ** 2 / 16); i > 1; --i) {
			code += "-0"
		}
		this.code = code
	}

	get hasCustomSizeOrColors() {
		return this.options.size !== defaultOptions.size 
		|| this.options.colors.some((c, i) => defaultOptions.colors[i] !== c)
	}

	constructor() {
		this.code = "1ulcruti-1gayap20-19kb2140-1ubnzcwu"	
	}
}

document.addEventListener("DOMContentLoaded", () => new Editor())