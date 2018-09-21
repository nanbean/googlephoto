export const fetchGenerateVideo = (id) => () => {
	const apiUrl = `/generatevideo/${id}`;

	return fetch(apiUrl);
};
