import React, {MouseEvent, useContext} from 'react';
import { Button, Col } from "reactstrap";

import { getOptionalResourceNames } from '../../common/const';
import { AppContext } from "../../AppContext";
import { AppState, ResourceKey } from "../../common/types";

const OptionalInputs: React.FC = () => {
    const optionalResourcesName = getOptionalResourceNames();
    return (
        <Col>
            <div className="row add-space button-row-space">
                { optionalResourcesName.map(
                    (optionalResName, idx) => <OptionalInputBnt
                        key={idx}
                        name={optionalResName}
                    />
                )}
            </div>
        </Col>
    );
};

type OptionalInputBntProps = { name: ResourceKey };
const OptionalInputBnt: React.FC<OptionalInputBntProps> = (props: OptionalInputBntProps) => {

    const
        context = useContext(AppContext),
        {isVisible, hasLoadFailed, toggleVisibility} = (context as AppState);

    const
        {name} = props,
        visible = isVisible(name),
        disabled = hasLoadFailed(name),
        text = visible ? `Remove ${name}` : `Add ${name}`;

    return (
        <div className="col-sm-4">
            <div className="text-center">
                <Button
                    color="secondary"
                    size="lg"
                    onClick={(e: MouseEvent) => toggleVisibility(name)}
                    disabled={disabled}
                    visible={visible.toString()}
                >
                    {text}
                </Button>
            </div>
        </div>
    );
};

export { OptionalInputs, OptionalInputBnt };
