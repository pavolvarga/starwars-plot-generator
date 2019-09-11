import React from 'react';
import {Alert, Col} from 'reactstrap';
import {OPTIONAL_RESOURCES} from "../../common/const";

const OPTIONAL_RESOURCES_SINGULAR: string[] = OPTIONAL_RESOURCES.map(r => r.singular);

type LoadFailedAlertsProps = {
    visibles: boolean[]
};
const LoadFailedAlerts: React.FunctionComponent<LoadFailedAlertsProps> = (props: LoadFailedAlertsProps) => {
    const {visibles} = props;
    return (
        <Col>
            <div className="row">
                { OPTIONAL_RESOURCES_SINGULAR.map(
                    (resource, idx) => <LoadFailedAlert
                        key={idx}
                        name={resource}
                        visible={visibles[idx]}
                    />
                )}
            </div>
        </Col>
    );
};

type LoadFailedAlertProps = {
    visible: boolean,
    name: string
};
const LoadFailedAlert: React.FunctionComponent<LoadFailedAlertProps> = (props: LoadFailedAlertProps) => {
    const {name, visible} = props;
    if (visible) {
        return (
            <div className="text-center">
                <Alert color="danger">
                    {`Loading of ${name} failed, please try again later.`}
                </Alert>
            </div>
        );
    }
    return null;
};

export { LoadFailedAlert, LoadFailedAlerts };
