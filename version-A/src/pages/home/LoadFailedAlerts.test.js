import React from 'react';
import { mount } from 'enzyme/build';
import { LoadFailedAlert, LoadFailedAlerts } from "./LoadFailedAlerts";

describe('LoadFailedAlerts', () => {
    it('should render correctly in debug mode', () => {
        const component = mount(<LoadFailedAlert name={''} visible={false} />);
        expect(component).toMatchSnapshot();
    });
    it('should render correctly in debug mode', () => {
        const component = mount(<LoadFailedAlerts visibles={[]}/>);
        expect(component).toMatchSnapshot();
    });
});