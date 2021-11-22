import React from 'react';
import {Component} from 'react';
import {Container, Row, ButtonGroup, Button, InputGroup, FormControl, Col} from 'react-bootstrap';

import './background.scss';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    onChangeInput = e => {
        const input = e.target.value;
        let change = this.state.input.concat(input)
        this.setState({input: change});
    }

    onClean = () => {
        this.setState({input: ''});
    }

    onDelete = () => {
        let state = this.state.input;
        this.setState({
            input: state.slice(0, state.length-1)
        })
    }

    calculation = () => {
        const state = this.state.input;
        
        const mat = state.split(/[^.\d]/);
        const sign = String(state.match(/[^.\d]/));
        let result;

        switch(sign) {
            case '+': result = Number(mat[0]) + Number(mat[1]); break
            case '-': result = Number(mat[0]) - Number(mat[1]); break
            case '×': result = Number(mat[0]) * Number(mat[1]); break
            case '÷': result = Number(mat[0]) / Number(mat[1]); break
            default: result = 'Error'; break
        }

        this.setState({
            input: String(result)
        })
    }

    onChange = () => {
        return this.state.input
    }

    onChangeKeyboard = (event) => {
        let input;
        if (event.key === '*') {
            input = '×';
            const change = this.state.input.concat(input);
            this.setState({input: change});
        } else if (event.key === '/') {
            input = '÷';
            const change = this.state.input.concat(input);
            this.setState({input: change});
        } else if (event.key === 'Shift' || event.key === 'Meta' || (event.key >= 'a' && event.key <= 'z')) {
        } else if (event.key === 'Backspace') {
            this.onDelete();
        } else if (event.key === 'Enter') {
            this.calculation();
        } else {
            input = event.key;
            const change = this.state.input.concat(input);
            this.setState({input: change});
        }
    }

    render() {
        return (
            <div className='bg-dark bg-calc d-flex p-2'>
                <Container >
                    <Row xs={3} sm={12} className='pb-2'>
                        <Col>
                            <InputGroup>
                            <InputGroup.Text id="result">Result</InputGroup.Text>
                                <FormControl
                                    aria-label="result"
                                    aria-describedby="result"
                                    value={this.state.input}
                                    onChange={this.onChange}
                                    onKeyDown={this.onChangeKeyboard}
                                    type='text'
                                    autoFocus
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row xs={3} sm={12} className="pt-1">                  
                        <ButtonGroup size="lg" className="mb-2">
                            <Button as="button" onClick={this.onClean}>C</Button>
                            <Button as="button" value='÷' onClick={this.onChangeInput}>÷</Button>
                            <Button as="button" value='×' onClick={this.onChangeInput}>×</Button>
                            <Button as="button" onClick={this.onDelete}>D</Button>
                        </ButtonGroup>
                    </Row>
                    <Row xs={3} sm={12}>                    
                        <ButtonGroup size="lg" className="mb-2">
                            <Button variant="secondary" as="button" value='7' onClick={this.onChangeInput}>7</Button>
                            <Button variant="secondary" as="button" value='8' onClick={this.onChangeInput}>8</Button>
                            <Button variant="secondary" as="button" value='9' onClick={this.onChangeInput}>9</Button>
                            <Button as="button" value='-' onClick={this.onChangeInput}>–</Button>
                        </ButtonGroup>
                    </Row>
                    <Row xs={3} sm={12}>                    
                        <ButtonGroup size="lg" className="mb-2">
                            <Button variant="secondary" as="button" value='4' onClick={this.onChangeInput}>4</Button>
                            <Button variant="secondary" as="button" value='5' onClick={this.onChangeInput}>5</Button>
                            <Button variant="secondary" as="button" value='6' onClick={this.onChangeInput}>6</Button>
                            <Button as="button" value='+' onClick={this.onChangeInput}>+</Button>
                        </ButtonGroup>
                    </Row>
                    <Row xs={3} sm={12}>                    
                        <ButtonGroup size="lg" className="mb-2">
                            <Button variant="secondary" as="button" value='1' onClick={this.onChangeInput}>1</Button>
                            <Button variant="secondary" as="button" value='2' onClick={this.onChangeInput}>2</Button>
                            <Button variant="secondary" as="button" value='3' onClick={this.onChangeInput}>3</Button>
                            <Button as="button" onClick={this.calculation}>=</Button>
                        </ButtonGroup>
                    </Row>
                    <Row xs={3} sm={12}>                    
                        <ButtonGroup size="lg" className="mb-2">
                            <Button variant="secondary" as="button" value='0' onClick={this.onChangeInput}>0</Button>
                            <Button as="button" value='.' onClick={this.onChangeInput}>.</Button>
                        </ButtonGroup>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Background;