export function replaceStringAt(src: string, index: number, replacement: string) {
	return src.substr(0, index) + replacement + src.substr(index + replacement.length)
}
