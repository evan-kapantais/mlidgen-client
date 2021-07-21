import axios from 'axios';

const baseUrl = '/api/base';

const getAll = () => axios.get(baseUrl).then((res) => res.data[0]);

const updateOne = (id, object) =>
	axios.put(`${baseUrl}/${id}`, object).then((res) => res.data);

const baseService = {
	getAll,
	updateOne,
};

export default baseService;
