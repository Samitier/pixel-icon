export const defaultOptions = {
	borderSize: 0,
	colors: [
		"#000",
		"#47A8BD",
		"#9FD356",
		"#9C3848",
		"#FFF"
	],
	height: 8,
	size: 20,
	width: 8,
}

export interface Options {
	borderSize?: number
	colors?: string[]
	height?: number
	size?: number
	width?: number
}
