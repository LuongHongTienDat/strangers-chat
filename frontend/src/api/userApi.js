import axios from 'axios';

const url = "http://localhost:5000"
export const register = async (formValue) => {

    if(formValue.userName==='' || formValue.password===''){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `${url}/api/user/register`,
        data: formValue,
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }

  }


 export const login = async(formValue) => {

    if( formValue.userName==='' || formValue.password===''){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: `${url}/api/user/auth`,
        data: formValue,
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export const userInfo = async(token) => {

    if(token === undefined){
        return 
    }
    try {
      // make axios post request
      const res = await axios({
        method: "get",
        url:`${url}/api/user`,
        headers: {authorization: token },
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }





