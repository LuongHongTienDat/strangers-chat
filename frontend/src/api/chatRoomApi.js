import axios from 'axios';

const url = "http://localhost:5000"
export const getMessages = async (token,title) => {
    try {
        const res = await axios({
          method: "get",
          url: `${url}/api/message`,
          params:{title},
          headers: { authorization: token },
        });
        return res.data;
    } catch(error) {
          return error.response.data;
    }
}

