import React from 'react';
import { mount } from 'enzyme';
import { GenerateBnt } from "./GenerateBnt";

describe('GenerateBnt', () => {
    function createGenerateBnt() {
        return mount(<GenerateBnt isGenerateBntDisabled={() => false} generatePlot={() => undefined} />);
    }
    it('should render correctly in "debug" mode', () => {
        const component = createGenerateBnt();
        expect(component).toMatchSnapshot();
    });
});
