import axios from 'axios';

const url = "http://localhost:5000"
export const getJoinedRooms = async (token) => {
    try {
        const res = await axios({
          method: "get",
          url: `${url}/api/profile`,
          headers: { authorization: token },
        });
        return res.data;
    } catch(error) {
          return error.response.data;
    }
}

export const joinRoom = async (token, title) => {
    try {
        const res = await axios({
          method: "post",
          url: `${url}/api/profile/join`,
          data: {title},
          headers: { authorization: token },
        });
        return res.data;
    } catch(error) {
          return error.response.data;
    }
}