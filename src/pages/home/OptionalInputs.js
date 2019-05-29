import React, { Component } from 'react';
import {Button, Col} from "reactstrap";
import { OPTIONAL_RESOURCES } from './../../common/const';

const OPTIONAL_RESOURCES_SINGULAR = OPTIONAL_RESOURCES.map(r => r.singular);

class OptionalInputs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {visibles, toggleVisibilityFn} = this.props;
        return (
            <Col>
                <div className="row add-space button-row-space">
                    { OPTIONAL_RESOURCES_SINGULAR.map(
                        (resource, idx) => <OptionalInputBnt
                            key={idx}
                            name={resource}
                            toggleVisibilityFn={toggleVisibilityFn}
                            visible={visibles[idx]}
                        />
                    )}
                </div>
            </Col>
        )
    }
}

class OptionalInputBnt extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const
            {name, toggleVisibilityFn, visible} = this.props,
            text = visible ? `Remove ${name}` : `Add ${name}`;
        return (
            <div className="col-sm-4">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={e => toggleVisibilityFn(name)}
                >
                    {text}
                </Button>
            </div>
        );
    }
}

export { OptionalInputs, OptionalInputBnt };