function writeKey(key: string, data: any) {
	const store: Storage = window.localStorage;

	store.setItem(key, JSON.stringify(data));
}

function readKey(key: string): string {
	const store: Storage = window.localStorage;

	const value = store.getItem(key);
	if (value) {
		return value;
	} else {
		return '{}';
	}
}

export { readKey, writeKey };
