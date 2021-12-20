import React from 'react';
import { mount } from 'enzyme';
import { Description, Title, ResourceLink, Resources, Plot } from "./ResultPage";
import { createBrowserHistory } from 'history';

describe('Description', () => {
    it('should render correctly in "debug" mode', () => {
        const component = mount(<Description description=''/>);
        expect(component).toMatchSnapshot();
    });
});

describe('Title', () => {
    it('should render correctly in "debug" mode', () => {
        const component = mount(<Title title=''/>);
        expect(component).toMatchSnapshot();
    });
});

describe('ResourceLink', () => {
    it('should render correctly in "debug" mode', () => {
        const component = mount(<ResourceLink key={0} url='http://...'/>);
        expect(component).toMatchSnapshot();
    });
});

describe('Resources', () => {
    it('should render correctly in "debug" mode', () => {
        const resources = ['http://0...', 'http://1...'];
        const component = mount(<Resources resources={resources} />);
        expect(component).toMatchSnapshot();
    });
});

describe('Plot', () => {
    it('should render correctly in "debug" mode', () => {
        const
            history = createBrowserHistory(),
            location = history.location,
            match = {
                isExact: false,
                path: '/',
                url: '/',
                params: {}
            };

        location.state = {state: {}};

        const component = mount(<Plot history={history} location={location} match={match} />);
        expect(component).toMatchSnapshot();
    });
});
