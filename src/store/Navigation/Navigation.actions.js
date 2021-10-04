import { TOGGLE_NAV } from "./Navigation.types";

export function toggleNav(newSelect) {
    return {
        type: TOGGLE_NAV,
        payload: newSelect
    }
}