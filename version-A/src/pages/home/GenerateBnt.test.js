import React from 'react';
import { mount } from 'enzyme/build';
import { GenerateBnt } from "./GenerateBnt";

const NOOP = () => {};

describe('GenerateBnt', () => {
    function createGenerateBnt() {
        return mount(<GenerateBnt debug isGenerateBntDisabled={NOOP} handleOnGenerateBntClick={NOOP} />);
    }
    it('should render correctly in "debug" mode', () => {
        const component = createGenerateBnt();
        expect(component).toMatchSnapshot();
    });
});
