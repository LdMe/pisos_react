import axios from 'axios';

const url = 'http://api.pisos.lafuentedanel.com/prices';

export const getProvinces = async () => {
    const response = await axios.get(`${url}/provinces`);
    return response.data;
}

export const getBins = async () => {
    const response = await axios.get(`${url}/bins`);
    return response.data;
}

export const getDates = async () => {
    const response = await axios.get(`${url}/dates`);
    return response.data;
}

export const getPrices2 = async (data) => {
    // convert data to uri
    const uri = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    console.log(uri);
    console.log(data);
    const response = await axios.get(`${url}/predict?${uri}`);
    console.log(response);
    return response;
}

export const getGraph = async (data,uri) => {
    
    const response = await axios.post(`${url}/${uri}`,data);
    return response;
}

export const getPrices3 = (uri)  =>  axios.get(`${url}/predict?${uri}`);

export const getPrices = (uri) => axios.get(`${url}/predict?${uri}`);

