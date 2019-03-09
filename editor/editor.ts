import ColorPicker from "./color-picker"
import Icon from "./icon"

class Editor {

	private icon = new Icon(c => this.code = c)
	private colorPicker = new ColorPicker(c => this.icon.color = c)

	private $myCode = document.getElementById("my-code")
	
	private _code = ""
	get code() { return this._code }
	set code(c: string) {
		this._code = c
		this.icon.render(c)
		if(this.$myCode) this.$myCode.innerHTML = c
	}

	constructor() {
		this.code = "29edhf0-1xtttiwo-4c7q60o-577tur0"	
	}
}

document.addEventListener("DOMContentLoaded", () => new Editor())