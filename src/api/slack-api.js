import axios from 'axios'

const API_URL = 'https://slackapi.avionschool.com/api/v1'

export const register = async (email, password, passwordConfirmation) => {
  let errors = []
  const response = await axios
    .post(`${API_URL}/auth`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    .catch((error) => {
      errors = error.response.data.errors.full_messages
    })

  return [response, errors]
}

export const login = async (email, password) => {
  let errors = []
  const response = await axios
    .post(`${API_URL}/auth/sign_in`, {
      email,
      password,
    })
    .catch((error) => {
      errors = error.response.data.errors.full_messages
    })

  return [response, errors]
}

export const getUsers = async (headers) => {
	let users = [];
	try {
		const res = await axios.get(`${API_URL}/users`, {
			headers: {
				...headers,
			},
		});
		users = res.data.data;
	} catch (e) {
		console.log(e.response);
	}

	return users;
};