import React, { Component } from 'react';
import {Button, Col} from "reactstrap";
import { OPTIONAL_RESOURCES } from './../../common/const';

const OPTIONAL_RESOURCES_SINGULAR = OPTIONAL_RESOURCES.map(r => r.singular);

class OptionalInputs extends Component {
    render() {
        const {visibles, toggleVisibilityFn, disabled} = this.props;
        return (
            <Col>
                <div className="row add-space button-row-space">
                    { OPTIONAL_RESOURCES_SINGULAR.map(
                        (resource, idx) => <OptionalInputBnt
                            key={idx}
                            name={resource}
                            toggleVisibilityFn={toggleVisibilityFn}
                            visible={visibles[idx]}
                            disabled={disabled[idx]}
                        />
                    )}
                </div>
            </Col>
        )
    }
}

class OptionalInputBnt extends Component {
    render() {
        const
            {name, toggleVisibilityFn, visible, disabled} = this.props,
            text = visible ? `Remove ${name}` : `Add ${name}`;
        return (
            <div className="col-sm-4">
                <div className="text-center">
                    <Button
                        color="secondary"
                        size="lg"
                        onClick={e => toggleVisibilityFn(name)}
                        disabled={disabled}
                    >
                        {text}
                    </Button>
                </div>
            </div>
        );
    }
}

export { OptionalInputs, OptionalInputBnt };