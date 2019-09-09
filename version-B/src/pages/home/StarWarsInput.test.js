import React from 'react';
import { mount } from 'enzyme/build';
import { StarWarsInput } from "./StarWarsInput";

const NOOP = () => {};

describe('StarWarsInput', () => {
    function createStarWarsInput() {
        return mount(<StarWarsInput id={''} name={''} placeholder={''} data={[]} setFn={NOOP} visible={true}/>);
    }
    it('should render correctly in "debug" mode', () => {
        const component = createStarWarsInput();
        expect(component).toMatchSnapshot();
    });
});
