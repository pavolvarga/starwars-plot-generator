import { combineReducers } from "redux";
import { InputFormState } from "../common/types";
import { reducerPerson } from "./person";
import { reducerPlanet } from "./planet";
import { reducerSpecies } from "./spieces";
import { reducerStarship } from "./starship";

export const initialFormState: InputFormState = {
    person: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    planet: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
    species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
};

export const reducer = combineReducers({
    person: reducerPerson,
    planet: reducerPlanet,
    starship: reducerStarship,
    vehicle: reducerSpecies,
    species: reducerSpecies
});
