import React, { FC} from 'react';
import { Alert, Col } from 'reactstrap';
import { connect } from "react-redux";

import { InputFormState } from "../../common/types";
import { getOptionalResourceNames } from "../../common/common";

type LoadFailedAlertProps = { name: string };
const LoadFailedAlert: FC<LoadFailedAlertProps> = (props: LoadFailedAlertProps) => {
    return (
        <div className="text-center">
            <Alert color="danger">
                {`Loading of ${props.name} failed, please try again later.`}
            </Alert>
        </div>
    );
};

type LoadFailedAlertsProps = {
    loadFailedOptionalRes: string[]
}
const LoadFailedAlerts: FC<LoadFailedAlertsProps> = (props: LoadFailedAlertsProps) => {
    const { loadFailedOptionalRes } = props;
    return (
        <Col>
            <div className="row">
                {
                    loadFailedOptionalRes.map((name, idx) => <LoadFailedAlert key={idx} name={name}/>)
                }
            </div>
        </Col>
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