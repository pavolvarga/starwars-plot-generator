import React, { FC } from 'react';
import { Button, Col } from "reactstrap";
import { connect } from "react-redux";

import { InputFormState, ResourceKey } from "../../common/types";

type OptionalInputBntProps = {
    visible: boolean,
    disabled: boolean,
    name: string
}
const OptionalInputBnt: FC<OptionalInputBntProps> = ({visible, disabled, name}: OptionalInputBntProps) => {
    const text = visible ? `Remove ${name}` : `Add ${name}`;
    return (
        <div className="col-sm-4">
            <div className="text-center">
                <Button
                    color="secondary"
                    size="lg"
                    // onClick={(e: MouseEvent) => toggleVisibility(name)}
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
    const { resourceNames, resources } = props;
    return (
        <Col>
            <div className="row add-space button-row-space">
                { resourceNames.map(
                    (optionalResName: string, idx: number) => {
                        const optionalButtonProps = resources[optionalResName];
                        return <OptionalInputBnt key={idx} name={optionalResName} {...optionalButtonProps} />;
                    }
                )}
            </div>
        </Col>
    );
};

function mapStateToProps(state: InputFormState, ownProps: OwnProps) {
    const { resourceNames } = ownProps;
    const obj = resourceNames.reduce((acc: any, name: ResourceKey) => {
        acc[name] = {
            visible: state[name].visible,
            disabled: !state[name].loadFailed
        }
        return acc;
    }, {});
    return {
        resources: obj
    };
}

const ConnectedOptionalInputs = connect(mapStateToProps)(OptionalInputs);
export { ConnectedOptionalInputs as OptionalInputs };
