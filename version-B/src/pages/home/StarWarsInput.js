import React, { Component } from 'react';
import {Col, FormGroup, Input, Label} from "reactstrap";

class StarWarsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFromData: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value, data, setFn) {

        //ignore empty or too short text
        if (!value || value.length < 3) {
            this.setState(() => {
                return {selectedFromData: false}
            });
            setFn(undefined);
            return;
        }

        const foundIdx = data.findIndex(el => el.name === value);
        if (foundIdx !== -1) {
            this.setState(() => {
                return {selectedFromData: true}
            });
            setFn(data[foundIdx]);
        }
        else {
            this.setState(() => {
                return {selectedFromData: false}
            });
            setFn(undefined);
        }
    }

    render() {
        const {id, name, label, placeholder, data, setFn, visible} = this.props;

        if (!visible) {
            return null;
        }

        return (
            <Col>
                <FormGroup size="lg" row>
                    <Label for="input-person" size="lg">{label}</Label>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        bsSize="lg"
                        valid={this.state.selectedFromData ? true : undefined}
                        onChange={e => this.handleOnChange(e.target.value, data, setFn)}
                        disabled={data.length === 0} />
                </FormGroup>
            </Col>
        );
    }
}

export { StarWarsInput };