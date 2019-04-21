export const defaultOptions = {
	colors: [
		"#000",
		"#FFF",
		"#9FD356",
		"#9C3848",
		"#00000000"
	],
	hasBorder: false,
	size: 8
}

export interface Options {
	colors?: string[]
	hasBorder?: boolean
	size?: number
}
