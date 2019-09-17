import React, { MouseEvent, FC } from 'react';
import { Button, Col } from "reactstrap";
import { OPTIONAL_RESOURCES } from '../../common/const';

const OPTIONAL_RESOURCES_SINGULAR: string[] = OPTIONAL_RESOURCES.map(r => r.singular);

type OptionalInputsProps = {
    visibles: boolean[],
    toggleVisibilityFn: (name: string) => void,
    disabled: boolean[]
};
const OptionalInputs: FC<OptionalInputsProps> = (props: OptionalInputsProps) => {
    const {visibles, toggleVisibilityFn, disabled} = props;
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
};

type OptionalInputBntProps = {
    name: string,
    toggleVisibilityFn: (name: string) => void,
    visible: boolean,
    disabled: boolean
};
const OptionalInputBnt: FC<OptionalInputBntProps> = (props: OptionalInputBntProps) => {
    const
        {name, toggleVisibilityFn, visible, disabled} = props,
        text = visible ? `Remove ${name}` : `Add ${name}`;
    return (
        <div className="col-sm-4">
            <div className="text-center">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={(e: MouseEvent) => toggleVisibilityFn(name)}
                    disabled={disabled}
                >
                    {text}
                </Button>
            </div>
        </div>
    );
};

export { OptionalInputs, OptionalInputBnt };
