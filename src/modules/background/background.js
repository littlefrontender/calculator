import React from 'react';
import {Component} from 'react';
import {Container, Row, ButtonGroup, Button, InputGroup, FormControl, Col} from 'react-bootstrap';

import './background.scss';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            themeDark: true,
            dark: {
                variant1: 'outline-light',
                variant2: 'info',
                bg: 'bg-dark',
                color: 'text-light'
            },
            light: {
                variant1: 'primary',
                variant2: 'dark',
                bg: 'bg-light',
                color: 'text-dark'
            }
        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.myRef.current.focus(); // фокус на Input
    }

    onChangeInput = e => {
        const input = e.target.value;
        let change = this.state.input.concat(input)
        this.setState({input: change});
    }

    onClean = () => {
        this.setState({input: ''});
        this.myRef.current.focus(); // фокус на Input
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

    onToggle = () => {
        this.setState({
            themeDark: !this.state.themeDark
        })
    }

    render() {

        const {variant1, variant2, bg, color} = this.state.themeDark ? this.state.dark : this.state.light;

        return (
            <div className={`${bg} bg-calc d-flex p-2`}>
                <div className='bg-cont'>
                    <Container >
                        <Row className='pb-2'>
                            <Col>
                                <InputGroup>
                                <InputGroup.Text className={`${bg} ${color}`} id="result">Result</InputGroup.Text>
                                    <FormControl
                                        aria-label="result"
                                        aria-describedby="result"
                                        value={this.state.input}
                                        onChange={this.onChange}
                                        onKeyDown={this.onChangeKeyboard}
                                        ref={this.myRef}
                                        type='text'
                                        className={`${bg} ${color}`}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="pt-1">                  
                            <ButtonGroup size="lg" className="mb-2">
                                <Button variant={variant1} onClick={this.onClean}>C</Button>
                                <Button variant={variant1} value='÷' onClick={this.onChangeInput}>÷</Button>
                                <Button variant={variant1} value='×' onClick={this.onChangeInput}>×</Button>
                                <Button variant={variant1} onClick={this.onDelete}>D</Button>
                            </ButtonGroup>
                        </Row>
                        <Row >                    
                            <ButtonGroup size="lg" className="mb-2">
                                <Button variant={variant2} value='7' onClick={this.onChangeInput}>7</Button>
                                <Button variant={variant2} value='8' onClick={this.onChangeInput}>8</Button>
                                <Button variant={variant2} value='9' onClick={this.onChangeInput}>9</Button>
                                <Button variant={variant1} value='-' onClick={this.onChangeInput}>–</Button>
                            </ButtonGroup>
                        </Row>
                        <Row >                    
                            <ButtonGroup size="lg" className="mb-2">
                                <Button variant={variant2} value='4' onClick={this.onChangeInput}>4</Button>
                                <Button variant={variant2} value='5' onClick={this.onChangeInput}>5</Button>
                                <Button variant={variant2} value='6' onClick={this.onChangeInput}>6</Button>
                                <Button variant={variant1} value='+' onClick={this.onChangeInput}>+</Button>
                            </ButtonGroup>
                        </Row>
                        <Row >                    
                            <ButtonGroup size="lg" className="mb-2">
                                <Button variant={variant2} value='1' onClick={this.onChangeInput}>1</Button>
                                <Button variant={variant2} value='2' onClick={this.onChangeInput}>2</Button>
                                <Button variant={variant2} value='3' onClick={this.onChangeInput}>3</Button>
                                <Button variant={variant1} onClick={this.calculation}>=</Button>
                            </ButtonGroup>
                        </Row>
                        <Row >                    
                            <ButtonGroup size="lg" className="mb-2">
                                <Button variant={variant2} value='0' onClick={this.onChangeInput}>0</Button>
                                <Button variant={variant1} value='.' onClick={this.onChangeInput}>.</Button>
                            </ButtonGroup>
                        </Row>
                    <Button
                    variant={this.state.themeDark ? 'light' : 'dark'} 
                    onClick={this.onToggle}
                    >Change theme</Button>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Background;
