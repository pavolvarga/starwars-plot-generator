import React, { FC} from 'react';
import { connect } from "react-redux";

import { InputFormState } from "../../common/types";
import { getOptionalResourceNames } from "../../common/common";

type LoadFailedAlertProps = { name: string };
const LoadFailedAlert: FC<LoadFailedAlertProps> = (props: LoadFailedAlertProps) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="alert alert-danger" role="alert">
                    {`Loading of ${props.name} failed, please try again later.`}
                </div>
            </div>
        </div>
    );
};

type LoadFailedAlertsProps = {
    loadFailedOptionalRes: string[]
}
const LoadFailedAlerts: FC<LoadFailedAlertsProps> = (props: LoadFailedAlertsProps) => {
    const { loadFailedOptionalRes } = props;
    return (
        <div>
            <div className="row">
                {
                    loadFailedOptionalRes.map((name, idx) => <LoadFailedAlert key={idx} name={name}/>)
                }
            </div>
        </div>
    );
};

function mapStateToProps(state: InputFormState) {
    const loadFailedOptionalRes = getOptionalResourceNames()
        .map((name) => state[name].loadFailed ? name : '')
        .filter(name => name !== '');
    return {
        loadFailedOptionalRes
    };
}

const ConnectedLoadFailedAlerts = connect(mapStateToProps)(LoadFailedAlerts);
export { ConnectedLoadFailedAlerts as LoadFailedAlerts };