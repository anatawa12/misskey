let isWebpSupportedCache: boolean | undefined;
export function isWebpSupported() {
	if (isWebpSupportedCache === undefined) {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		isWebpSupportedCache = canvas.toDataURL('image/webp').startsWith('data:image/webp');
	}
	return isWebpSupportedCache;
}
