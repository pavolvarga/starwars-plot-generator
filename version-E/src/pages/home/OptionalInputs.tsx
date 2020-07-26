import React, { FC } from 'react';
import { connect } from "react-redux";

import { InputFormState, ResourceKey } from "../../common/types";
import { load, toggleVisible } from "../../actions/actions";
import { getMandatoryResourceNames } from "../../common/common";

type OptionalInputBntProps = {
    visible: boolean,
    disabled: boolean,
    name: string,
    dataLoaded: boolean,
    toggleVisible: any,
    load: any
}
const OptionalInputBnt: FC<OptionalInputBntProps> = (props: OptionalInputBntProps) => {
    const { visible, disabled, name, dataLoaded, toggleVisible, load } = props;
    const text = visible ? `Remove ${name}` : `Add ${name}`;
    return (
        <div className="col-sm-4">
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => {
                        toggleVisible(name);
                        if (!dataLoaded) {
                            load(name, false);
                        }
                    }}
                    disabled={disabled}
                >
                    {text}
                </button>
            </div>
        </div>
    );
};


type OwnProps = {
    resourceNames: ResourceKey[]
}
const OptionalInputs: React.FC<any> = (props: any) => {
    const { resourceNames, resources, toggleVisible, load } = props;
    return (
        <div>
            <div className="row add-space button-row-space">
                { resourceNames.map(
                    (optionalResName: string, idx: number) => {
                        const optionalButtonProps = resources[optionalResName];
                        return (
                            <OptionalInputBnt
                                key={idx}
                                name={optionalResName}
                                toggleVisible={toggleVisible}
                                load={load}
                                {...optionalButtonProps}
                            />
                        );
                    }
                )}
            </div>
        </div>
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleVisible: (name: string) => dispatch(toggleVisible(name)),
        load: (name: string, clearAfterFailure: boolean) => dispatch(load(name, clearAfterFailure))
    };
}

const ConnectedOptionalInputs = connect(mapStateToProps, mapDispatchToProps)(OptionalInputs);
export { ConnectedOptionalInputs as OptionalInputs };
