const onHotReload = (callback: () => void) => {
	if (import.meta.hot) {
		import.meta.hot.accept(() => {
			callback();
		});
	}
};

export default onHotReload;
