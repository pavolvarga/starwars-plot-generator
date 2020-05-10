import React, { FC } from 'react';
import { Button, Col } from "reactstrap";
import { connect } from "react-redux";

import { InputFormState, ResourceKey } from "../../common/types";
import { load, toggleVisible } from "../../actions/actions";
import { getMandatoryResourceNames } from "../../common/common";

type OptionalInputBntProps = {
    visible: boolean,
    disabled: boolean,
    name: string,
    dispatch: any,
    dataLoaded: boolean
}
const OptionalInputBnt: FC<OptionalInputBntProps> = (props: OptionalInputBntProps) => {
    const { visible, disabled, name, dispatch, dataLoaded } = props;
    const text = visible ? `Remove ${name}` : `Add ${name}`;
    return (
        <div className="col-sm-4">
            <div className="text-center">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={() => {
                        dispatch(toggleVisible(name));
                        if (!dataLoaded) {
                            dispatch(load(name,false))
                        }
                    }}
                    disabled={disabled}
                    visible={visible.toString()}
                >
                    {text}
                </Button>
            </div>
        </div>
    );
};


type OwnProps = {
    resourceNames: ResourceKey[]
}
const OptionalInputs: React.FC<any> = (props: any) => {
    const { resourceNames, resources, dispatch } = props;
    return (
        <Col>
            <div className="row add-space button-row-space">
                { resourceNames.map(
                    (optionalResName: string, idx: number) => {
                        const optionalButtonProps = resources[optionalResName];
                        return (
                            <OptionalInputBnt
                                key={idx}
                                name={optionalResName}
                                dispatch={dispatch}
                                {...optionalButtonProps}
                            />
                        );
                    }
                )}
            </div>
        </Col>
    );
};

function mapStateToProps(state: InputFormState, ownProps: OwnProps) {
    const { resourceNames } = ownProps;
    const enabled = getMandatoryResourceNames()
        .reduce((acc, name) => acc && state[name].selected !== undefined, true);
    const resources = resourceNames.reduce((acc: any, name: ResourceKey) => {
        acc[name] = {
            visible: state[name].visible,
            disabled: !enabled,
            dataLoaded: state[name].data.length > 0
        }
        return acc;
    }, {});
    return {
        resources
    };
}

const ConnectedOptionalInputs = connect(mapStateToProps)(OptionalInputs);
export { ConnectedOptionalInputs as OptionalInputs };
