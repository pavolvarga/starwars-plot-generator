import React, { MouseEvent } from 'react';
import { Button, Col } from "reactstrap";

type GenerateBntProps = {
    generatePlot: () => void,
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
                    onClick={(e: MouseEvent) => generatePlot()}
                    disabled={isGenerateBntDisabled()}>
                    Generate Plot
                </Button>
            </div>
        </Col>
    );
};

export { GenerateBnt };