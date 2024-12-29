import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const login = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/manager/login/`,
      obj,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export function getUserInfo() {
  let info = localStorage.getItem('user_info') || '{}';
  info = JSON.parse(info);

  return {
    id: info.responsible_person_id,
    responsible_person_id: info.responsible_person_id,
    driver_name: 'xiaoming',
  };
}
