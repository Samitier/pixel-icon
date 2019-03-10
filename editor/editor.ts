import PixelIcon from "../src/pixel-icon"
import ColorPicker from "./color-picker"
import Icon from "./icon"

class Editor {

	private icon = new Icon(c => this.code = c)
	private colorPicker = new ColorPicker(c => this.icon.color = c)

	private $myCode = document.getElementById("my-code")
	private $titleIcon = document.getElementById("title-icon")

	private _code = ""
	get code() { return this._code }
	set code(c: string) {
		this._code = c
		this.icon.render(c)
		if(this.$myCode) this.$myCode.innerHTML = c
		if (this.$titleIcon) PixelIcon.render(this.$titleIcon, this.code)
	}

	constructor() {
		this.code = "hivr9g8-rzdtm4g-l31vu28-l31ver4-e0pdlzh-1"	
	}
}

document.addEventListener("DOMContentLoaded", () => new Editor())