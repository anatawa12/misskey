const twemojiSvgBase = '/twemoji';
const fluentEmojiPngBase = '/fluent-emoji';
const blobmojiSvgBase = '/blobmoji';

export function chat2pathSelector(emojiStyle: string): (char: string) => string {
	console.log(emojiStyle);
	switch (emojiStyle) {
		case "twemoji":
			return char2twemojiFilePath
		case "fluentEmoji":
			return char2fluentEmojiFilePath
		case "blobmoji":
		default:
			return char2BlobmojiFilePath
	}
}

function char2twemojiFilePath(char: string): string {
	let codes = Array.from(char).map(x => x.codePointAt(0)?.toString(16));
	if (!codes.includes('200d')) codes = codes.filter(x => x !== 'fe0f');
	codes = codes.filter(x => x && x.length);
	const fileName = codes.join('-');
	return `${twemojiSvgBase}/${fileName}.svg`;
}

function char2fluentEmojiFilePath(char: string): string {
	let codes = Array.from(char).map(x => x.codePointAt(0)?.toString(16));
	// Fluent Emojiは国旗非対応 https://github.com/microsoft/fluentui-emoji/issues/25
	if (codes[0]?.startsWith('1f1')) return char2twemojiFilePath(char);
	if (!codes.includes('200d')) codes = codes.filter(x => x !== 'fe0f');
	codes = codes.filter(x => x && x.length);
	const fileName = codes.map(x => x!.padStart(4, '0')).join('-');
	return `${fluentEmojiPngBase}/${fileName}.png`;
}

function char2BlobmojiFilePath(char: string): string {
	let codes = Array.from(char).map(x => x.codePointAt(0)?.toString(16));
	if (!codes.includes('200d')) codes = codes.filter(x => x !== 'fe0f');
	codes = codes.filter(x => x && x.length);
	const fileName = codes.join('-');
	return `${blobmojiSvgBase}/${fileName}.svg`;
}
