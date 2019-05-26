import React from 'react';
import { shallow } from 'enzyme';

import { InputForm } from './HomePage';

describe('HomePage', () => {
    it('should render correctly in "debug" mode', () => {

        const component = shallow(<InputForm debug />);

        expect(component).toMatchSnapshot();
    });

    describe('generate button dissabled propery', () => {
       it('should be false if input values are set', () => {

           const component = shallow(<InputForm/>);
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

           const component = shallow(<InputForm/>);
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

            const component = shallow(<InputForm/>);
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