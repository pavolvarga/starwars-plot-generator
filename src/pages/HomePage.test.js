import React from 'react';
import { mount } from 'enzyme';

import { InputForm } from './HomePage';

describe('HomePage', () => {
    function createInputForm() {
        const customProps = {people: [], planets: []};
        return mount(<InputForm debug customProps={customProps}/>)
    }

    it('should render correctly in "debug" mode', () => {

        const component = createInputForm();

        expect(component).toMatchSnapshot();
    });

    describe('generate button dissabled propery', () => {
       it('should be false if input values are set', () => {

           const component = createInputForm();
           component.setState({
               selected: {
                   person: 'Luke Skywalker',
                   planet: 'Tatooine'
               }
           });

           const result = component.instance().isGenerateBntDisabled();

           expect(result).toEqual(false);
       });
       it('should be true if one input value is undefined', () => {

           const component = createInputForm();
           component.setState({
               selected: {
                   person: undefined,
                   planet: 'Tatooine'
               }
           });

           const result = component.instance().isGenerateBntDisabled();

           expect(result).toEqual(true);
       });
        it('should be true if one input value is an empty string', () => {

            const component = createInputForm();
            component.setState({
                selected: {
                    person: '',
                    planet: 'Tatooine'
                }
            });

            const result = component.instance().isGenerateBntDisabled();

            expect(result).toEqual(true);
        });
    });
});