import React, { FC } from 'react';
import { connect } from "react-redux";

import { InputFormState } from "../../common/types";

type LoaderProps = {
    mandatoryDataLoaded: boolean
}

const Loader: FC<LoaderProps> = ({mandatoryDataLoaded}: LoaderProps) => {

    if (!mandatoryDataLoaded) {
        return (
            <div className="text-center">
                <h3>Please wait while star wars data is being loaded</h3>
                <div className="spinner-border" role="status" style={{width: "5rem", height: "5rem"}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return null;
};

function mapStateToProps(state: InputFormState) {
    const personsLoaded = !state.person.loadingInProgress;
    const planetsLoaded = !state.planet.loadingInProgress;
    return {
        mandatoryDataLoaded: personsLoaded && planetsLoaded
    };
}

const ConnectedLoader = connect(mapStateToProps)(Loader);
export { ConnectedLoader as Loader };
