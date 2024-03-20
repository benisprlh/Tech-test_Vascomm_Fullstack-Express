export const isLogin = () => {
	return getToken() ? true : false;
};

export const getToken = () => {
	return localStorage.getItem('access_token');
};

export const getRole = () => {
	return localStorage.getItem('role');
};
