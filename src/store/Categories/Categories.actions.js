import { getCategorias } from "../../api/blog";
import { LOAD_API } from "./Categories.types";

function loadAPI(response) {
    return {
        type: LOAD_API,
        payload: response
    }
}

export async function fetchCategories(dispatch) {
    const response = await getCategorias();
    dispatch(loadAPI(response));
}