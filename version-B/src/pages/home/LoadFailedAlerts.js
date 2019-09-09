import React, { Component } from 'react';
import {Alert, Col} from 'reactstrap';
import {OPTIONAL_RESOURCES} from "../../common/const";

const OPTIONAL_RESOURCES_SINGULAR = OPTIONAL_RESOURCES.map(r => r.singular);

class LoadFailedAlerts extends Component {

    render() {
        const {visibles} = this.props;
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
    }
}

class LoadFailedAlert extends Component {

    render() {
        const {name, visible} = this.props;
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
    }
}

export { LoadFailedAlert, LoadFailedAlerts };
