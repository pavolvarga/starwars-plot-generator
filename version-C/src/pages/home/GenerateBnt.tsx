import React, {MouseEvent, useContext} from 'react';
import { Button, Col } from "reactstrap";

import { AppContext } from "../../AppContext";
import { AppState } from "../../common/types";

type GenerateBntProps = {
    generatePlot: () => void
}
const GenerateBnt: React.FunctionComponent<GenerateBntProps> = (props: GenerateBntProps) => {

    const
        context = useContext(AppContext),
        {areMandatoryInputsSelected} = (context as AppState);

    return (
        <Col>
            <div className="text-center">
                <Button
                    color="primary"
                    size="lg"
                    onClick={(e: MouseEvent) => props.generatePlot()}
                    disabled={!areMandatoryInputsSelected()}>
                    Generate Plot
                </Button>
            </div>
        </Col>
    );
};

export { GenerateBnt };