import * as api from '../api/prices';

export const getProvinces = () => async (dispatch) => {
    try {
        const { data } = await api.getProvinces();
        dispatch({ type: 'FETCH_ALL', payload: data });
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBins = () => async (dispatch) => {
    try {
        const { data } = await api.getBins();
        dispatch({ type: 'FETCH_ALL', payload: data });
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getDates = () => async (dispatch) => {
    try {
        const { data } = await api.getDates();
        dispatch({ type: 'FETCH_ALL', payload: data });
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPrices = (data) => async (dispatch) => {
    console.log("datos", data);
    try {
        const uri = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        console.log("uri",uri);
        const { result } =   await api.getPrices(uri);
        console.log("result",result);
        dispatch({ type: 'FETCH_ALL', payload: result });
    } catch (error) {
        console.log(error.message);
    }

    
}