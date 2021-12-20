import React from 'react';
import { mount } from 'enzyme';
import { OptionalInputs, OptionalInputBnt } from "./OptionalInputs";

const NOOP = () => {};

describe('OptionalInputs', () => {
    function createOptionalInputs() {
        return mount(<OptionalInputs visibles={[]} toggleVisibilityFn={NOOP} disabled={[false]} />);
    }
    it('should render correctly in "debug" mode', () => {
        const component = createOptionalInputs();
        expect(component).toMatchSnapshot();
    });
});

describe('OptionalInputBnt', () => {
    function createOptionalInputBnt() {
        return mount(<OptionalInputBnt name={''} toggleVisibilityFn={NOOP} visible={false} disabled={false} />);
    }
    it('should render correctly in "debug" mode', () => {
        const component = createOptionalInputBnt();
        expect(component).toMatchSnapshot();
    });
});
