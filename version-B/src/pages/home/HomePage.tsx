import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Form, Container } from 'reactstrap';
import { loadStarWarsData, ResourceData } from '../../common/load-data';
import { StarWarsSearch, Suggestion, StarWarsSearchProps } from "./StarWarsSearch";
import { GenerateBnt } from "./GenerateBnt";
import { OptionalInputs } from "./OptionalInputs";
import { OPTIONAL_RESOURCES, FAILED_LOAD_COOL_DOWN } from '../../common/const';
import { LoadFailedAlerts } from './LoadFailedAlerts';

const OPTIONAL_RESOURCES_SINGULAR: string[] = OPTIONAL_RESOURCES.map(r => r.singular);

function getPluralName(singularName: string): string {
    return OPTIONAL_RESOURCES.filter(r => r.singular === singularName)[0].plural;
}

function upperCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

type InputState = {
    visible: boolean,
    selected: Suggestion | undefined,
    data: ResourceData[],
    loadingInProgress?: boolean,
    loadFailed: boolean
};
type InputFormState = {
    person: InputState,
    planet: InputState,
    starship: InputState,
    vehicle: InputState,
    species: InputState,
};
class InputForm extends Component<any, InputFormState> {

    constructor(props) {

        super(props);

        this.state = {
            person: {visible: true, selected: undefined, data: props.customProps.people, loadingInProgress: false, loadFailed: false},
            planet: {visible: true, selected: undefined, data: props.customProps.planets, loadingInProgress: false, loadFailed: false},
            starship: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
            vehicle: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false},
            species: {visible: false, selected: undefined, data: [], loadingInProgress: false, loadFailed: false}
        };

        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.isGenerateBntDisabled = this.isGenerateBntDisabled.bind(this);
        this.generatePlot = this.generatePlot.bind(this);
        this.loadResourceData = this.loadResourceData.bind(this);
        this.createSearchInputProps = this.createSearchInputProps.bind(this);
    }

    isGenerateBntDisabled(): boolean {
        return !(!!this.state.person.selected && !!this.state.planet.selected);
    }

    generatePlot(): void {
        const state = {};
        Object.keys(this.state).forEach(key => {
            state[key] = {selected: this.state[key].selected};
        });
        this.props.history.push({
            pathname: '/plot',
            state
        });
    }

    /**
     * @param name - the name of input (person, planet, ...)
     * @param suggestion - either undefined (if not selected) or a selected suggestion value
     */
    setSelectedValue(name: string, suggestion: Suggestion | undefined): void {
        const
            resource = this.state[name],
            updated = Object.assign(resource, {selected: suggestion}),
            obj = {};

        obj[name] = updated;
        this.setState(state => Object.assign(state, obj));
    }

    loadResourceData(name): void {
        const
            resourcePlural = getPluralName(name),
            resolve = (function storeOptionalResourceData(this: InputForm, value) {

                const
                    resource = this.state[name],
                    obj = {},
                    updated = Object.assign(resource, {loadingInProgress: false, data: value});

                obj[name] = updated;
                this.setState(state => Object.assign(state, obj));

            }).bind(this),
            reject = (function updateLoadFailed (this: InputForm, err) {
                const
                    resource = this.state[name],
                    obj = {},
                    updated = Object.assign(resource, {loadFailed: true, loadingInProgress: false});

                obj[name] = updated;
                this.setState(state => Object.assign(state, obj));

                //clear alert after specified time, and allow user to try it again
                setTimeout(function clearLoadFailed(this: InputForm) {
                    const cleared = Object.assign(resource, {visible: false, loadFailed: false});
                    obj[name] = cleared;
                    this.setState(state => Object.assign(state, obj));
                }.bind(this), FAILED_LOAD_COOL_DOWN * 1000);

            }).bind(this);

        loadStarWarsData(resourcePlural, resolve, reject);
    }

    toggleVisibility(name: string): void {

        const
            resource = this.state[name],
            obj = {};

        let updated = Object.assign(resource, {visible: !resource.visible, selected: undefined});

        //load data for the input in other function, after the input became visible
        //if it wasn't already loaded
        if(!this.state[name].loadingInProgress && this.state[name].data.length === 0) {
            updated = Object.assign(updated, {loadingInProgress: true});
            setTimeout(() => this.loadResourceData(name), 1);
        }

        obj[name] = updated;
        this.setState(state => Object.assign(state, obj));
    }

    createSearchInputProps(name: string, label?: string): StarWarsSearchProps {

        const
            normalizedLabel = label ? label : name,
            upperCasedLabel = upperCase(normalizedLabel);

        return {
            id: `input-${name}`,
            name: `input-${name}`,
            label: upperCasedLabel,
            placeholder: `Please enter a ${normalizedLabel}`,
            data: this.state[name].data,
            setFn: (function setEnteredValue(this: InputForm, selectedSuggestion: Suggestion | undefined) {
                this.setSelectedValue(name, selectedSuggestion);
            }).bind(this),
            visible: this.state[name].visible
        };
    }

    render() {

        const
            personProps = this.createSearchInputProps('person', 'character'),
            planetProps = this.createSearchInputProps('planet'),
            starshipProps = this.createSearchInputProps('starship'),
            vehicleProps = this.createSearchInputProps('vehicle'),
            speciesProps = this.createSearchInputProps('species');

        const generateBntProps = {
            isGenerateBntDisabled: this.isGenerateBntDisabled,
            generatePlot: this.generatePlot
        };

        const optionalInputsProps = {
            toggleVisibilityFn: this.toggleVisibility,
            //an array with boolean values representing weather an input for an optional resource is visible or not
            visibles: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].visible),
            //an array with boolean values representing weather the load button is disabled
            disabled: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].loadFailed)
        };

        const alertsProps = {
            visibles: OPTIONAL_RESOURCES_SINGULAR.map(x => this.state[x].loadFailed)
        };

        return (
            <div>
                <Container>
                    <Form>
                        <StarWarsSearch {...personProps} />
                        <StarWarsSearch {...planetProps} />
                        <StarWarsSearch {...starshipProps} />
                        <StarWarsSearch {...vehicleProps} />
                        <StarWarsSearch {...speciesProps} />
                        <OptionalInputs {...optionalInputsProps} />
                        <LoadFailedAlerts {...alertsProps} />
                        <GenerateBnt {...generateBntProps} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export { InputForm };
