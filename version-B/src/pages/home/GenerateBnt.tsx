import React from 'react';
import {Button, Col} from "reactstrap";

type GenerateBntProps = {
    generatePlot: () => undefined,
    isGenerateBntDisabled: () => boolean
};
const GenerateBnt: React.FunctionComponent<GenerateBntProps> = (props: GenerateBntProps) => {
    const {isGenerateBntDisabled, generatePlot} = props;
    return (
        <Col>
            <div className="text-center">
                <Button
                    color="primary"
                    size="lg"
                    onClick={e => generatePlot()}
                    disabled={isGenerateBntDisabled()}>
                    Generate Plot
                </Button>
            </div>
        </Col>
    );
};

export { GenerateBnt };