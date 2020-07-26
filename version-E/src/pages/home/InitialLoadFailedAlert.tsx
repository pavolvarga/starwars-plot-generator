import React, { FC } from 'react';
import { connect } from "react-redux";

import { InputFormState } from "../../common/types";

type InitialLoadFailedAlertProps = {
    mandatoryDataLoadFailed: boolean
}

const InitialLoadFailedAlert: FC<InitialLoadFailedAlertProps> = ({mandatoryDataLoadFailed}: InitialLoadFailedAlertProps) => {

    if (mandatoryDataLoadFailed) {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="alert alert-danger" role="alert">
                        Loading of initial data failed, please try again later.
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

function mapStateToProps(state: InputFormState) {
    const personsLoadFailed = !state.person.loadingInProgress && state.person.loadFailed;
    const planetsLoadFailed = !state.planet.loadingInProgress && state.planet.loadFailed;
    return {
        mandatoryDataLoadFailed: personsLoadFailed && planetsLoadFailed
    };
}

const ConnectedInitialLoadFailedAlert = connect(mapStateToProps)(InitialLoadFailedAlert);
export { ConnectedInitialLoadFailedAlert as InitialLoadFailedAlert };
