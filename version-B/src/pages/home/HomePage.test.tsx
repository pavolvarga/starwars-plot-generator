import React from 'react';
import { mount } from 'enzyme';

import { InputForm } from './HomePage';

describe('HomePage', () => {
    function createInputForm() {
        const customProps = {people: [], planets: []};
        // @ts-ignore
        return mount(<InputForm debug customProps={customProps}/>)
    }

    it('should render correctly in "debug" mode', () => {

        const component = createInputForm();

        expect(component).toMatchSnapshot();
    });

    describe('generate button disabled property', () => {
       it('should be false if input values are set', () => {

           const component = createInputForm();
           component.setState({
               person: {selected: 'Luke Skywalker'},
               planet: {selected: 'Tatooine'}
           });

           // @ts-ignore
           const result = component.instance().isGenerateBntDisabled();

           expect(result).toEqual(false);
       });
       it('should be true if one input value is undefined', () => {

           const component = createInputForm();
           component.setState({
               person: {selected: 'Luke Skywalker'},
               planet: {selected: undefined}
           });

           // @ts-ignore
           const result = component.instance().isGenerateBntDisabled();

           expect(result).toEqual(true);
       });
       it('should be true if one input value is an empty string', () => {

            const component = createInputForm();
            component.setState({
                selected: {
                    person: {selected: 'Luke Skywalker'},
                    planet: {selected: ''}
                }
            });

            // @ts-ignore
            const result = component.instance().isGenerateBntDisabled();

            expect(result).toEqual(true);
        });
    });
});
