import axios from 'axios';

const baseUrl = '/api/attacks';

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const getOne = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const addOne = (object) => axios.post(baseUrl, object).then((res) => res.data);

const updateOne = (id, object) =>
	axios.put(`${baseUrl}/${id}`, object).then((res) => res.data);

const deleteOne = (id) =>
	axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const attacksService = {
	getAll,
	getOne,
	addOne,
	updateOne,
	deleteOne,
};

export default attacksService;
