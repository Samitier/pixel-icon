export default class Encoder {
	
	private readonly maxRadix = 36
	private readonly maxStringLength = 16
	private readonly separator = "-"

	constructor(private radix: number) {}

	public encode(src: string) {
		let result = ""
		for (let position = 0; position < src.length; position += this.maxStringLength) {
			const part = src.substr(position, this.maxStringLength)
			const separator = result ? this.separator : ""
			result += separator + parseInt(part, this.radix).toString(this.maxRadix)
		}
		return result
	}

	public decode(src: string) {
		return src.split(this.separator)
			.map(s => {
				let str = parseInt(s, this.maxRadix).toString(this.radix)
				while(str.length < this.maxStringLength) str = "0" + str
				return str
			})
			.join("")
	}
}