import React from 'react';
import { connect } from "react-redux";

import { InputFormState } from "../../common/types";
import { getMandatoryResourceNames } from "../../common/common";

type GenerateBntProps = {
    generatePlot: () => void,
    mandatoryInputsSelected: boolean
}
const GenerateBnt: React.FunctionComponent<GenerateBntProps> = (props: GenerateBntProps) => {
    const { generatePlot, mandatoryInputsSelected } = props;
    return (
        <div className="row">
            <div className="col-lg-12">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => generatePlot()}
                    disabled={!mandatoryInputsSelected}>
                    Generate Plot
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state: InputFormState) {
    const mandatoryInputsSelected = getMandatoryResourceNames()
        .reduce((acc, name) => acc && (state[name].selected !== undefined), true);
    return {
        mandatoryInputsSelected
    }
}

const ConnectedGenerateBnt = connect(mapStateToProps)(GenerateBnt);
export { ConnectedGenerateBnt as GenerateBnt };
