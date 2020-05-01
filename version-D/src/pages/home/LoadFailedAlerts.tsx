import React, {FC, useContext} from 'react';
import {Alert, Col} from 'reactstrap';

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";

const LoadFailedAlerts: FC = () => {

    const
        context = useContext(AppContext),
        {failedLoadingOfOptionalData} = (context as AppState),
        failedOptional = failedLoadingOfOptionalData();

    return (
        <Col>
            <div className="row">
                {   failedOptional.map(
                        (name, idx) => <LoadFailedAlert key={idx} name={name}/>
                    )
                }
            </div>
        </Col>
    );
};

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

export { LoadFailedAlert, LoadFailedAlerts };