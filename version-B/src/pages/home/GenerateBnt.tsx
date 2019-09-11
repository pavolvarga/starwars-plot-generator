import React, { Component } from 'react';
import {Button, Col} from "reactstrap";

type GenerateBntProps = {
    generatePlot: () => undefined,
    isGenerateBntDisabled: () => boolean
};
class GenerateBnt extends Component<GenerateBntProps, {}> {

    render() {

        const {isGenerateBntDisabled, generatePlot} = this.props;

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
    }
}

export { GenerateBnt };