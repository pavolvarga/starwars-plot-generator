import React from 'react';
import { Button, Col } from "reactstrap";
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
        <Col>
            <div className="text-center">
                <Button
                    color="primary"
                    size="lg"
                    onClick={() => generatePlot()}
                    disabled={!mandatoryInputsSelected}>
                    Generate Plot
                </Button>
            </div>
        </Col>
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
