import { getCategorias } from "../../api/blog";
import { LOAD_API, REQUEST } from "./Categories.types";

function loadAPI(response) {
    return {
        type: LOAD_API,
        payload: response
    }
}

function startRequest() {
    return {
        type: REQUEST,
        payload: ''
    }
}

export async function fetchCategories(dispatch) {
    dispatch(startRequest());
    const response = await getCategorias();
    dispatch(loadAPI(response));
}