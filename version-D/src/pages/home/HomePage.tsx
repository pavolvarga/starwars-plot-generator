import React, { FC, Fragment } from 'react';
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import { Loader } from './Loader';
import { InputForm } from "./InputForm";
import { InputFormState } from "../../common/types";

type HomePageProps = RouteComponentProps & {mandatoryDataLoaded: boolean};

const HomePage: FC<HomePageProps> = ({mandatoryDataLoaded}: HomePageProps) => {

    return (
        <Fragment>
            <Loader mandatoryDataLoaded={mandatoryDataLoaded} />
            <InputForm mandatoryDataLoaded={mandatoryDataLoaded} />
        </Fragment>
    );
};

function mapStateToProps(state: InputFormState) {
    const personsLoaded = !state.person.loadingInProgress && !state.person.loadFailed;
    const planetsLoaded = !state.planet.loadingInProgress && !state.planet.loadFailed;
    return {
        mandatoryDataLoaded: personsLoaded && planetsLoaded
    };
}

const ConnectedHomePage = connect(mapStateToProps)(HomePage)
export { ConnectedHomePage as HomePage };