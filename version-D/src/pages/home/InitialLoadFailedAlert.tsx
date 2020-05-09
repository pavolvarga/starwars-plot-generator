import React, { FC } from 'react';
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import { InputFormState } from "../../common/types";

type InitialLoadFailedAlertProps = {
    mandatoryDataLoadFailed: boolean
}

const InitialLoadFailedAlert: FC<InitialLoadFailedAlertProps> = ({mandatoryDataLoadFailed}: InitialLoadFailedAlertProps) => {

    if (mandatoryDataLoadFailed) {
        return (
            <div className="text-center">
                <Alert color="danger">
                    Loading of initial data failed, please try again later.
                </Alert>
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
