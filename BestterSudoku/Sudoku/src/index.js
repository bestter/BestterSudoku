import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from "react";

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        //this.state = { onClick: props.onClick, value: props.value, position: props.position, cellkey: props.cellkey }
    }
    onCellClick() {
        console.debug('onCellClick');
        this.state.onClick();
        this.setState((state, props) => {
            return { cellkey: state.cellkey + 200 };
        });                
        //console.debug(this.state.position + "\nstate: " + this.state.value + "\nprops: " + this.props.value);
    }
    render() {
        return (<button ref={this.myRef} className="sudokuCell" id={'cell' + this.state.position} key={this.state.cellkey} onClick={() => this.onCellClick()}>
            {this.state.value}
        </button>);
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        //this.state = { index: props.index, rowkey: props.index, value: props.value }
    }
    onRowClick() {
        this.setState((state, props) => {
            return { rowkey: state.rowkey + 1234 };
        });        
    }
    render() {
        return (<div ref={this.myRef} className="sudokuRow" id={this.state.index} key={this.state.rowkey} onClick={() => this.onRowClick()}>{this.state.value}</div>);
    }
}

class Digit extends React.Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        //this.state = { value: props.value, onClick: props.onClick, active: false, className: props.className, digitKey: props.digitKey }
    }
    onDigitClick() {
        this.state.onClick(this.state.value);

        this.setState((state, props) => {
            return { digitKey: state.digitKey + 100 };
        });
    }
    //render() {
    //    return (<button ref={this.myRef} id={'digit' + this.state.value} key={this.state.digitKey} className={this.props.className} onClick={() => this.onDigitClick()}>{this.state.value}</button>)
    //}
}

class SudokuGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            cells: Array(9).fill(null).map(() => new Array(9).fill(null)),
            selectedDigit: null
        };
    }
    handleClick(row, column) {
        console.log('handleClick ' + this.state.selectedDigit);
        if (this.state.selectedDigit) {
            let a = this.state.cells.slice(); //creates the clone of the state
            a[row][column] = this.state.selectedDigit;
            this.setState((state, props) => {
                return { cells: a };
            });
            console.dir(a);
        }
        else {
            let a = this.state.cells.slice(); //creates the clone of the state
            a[row][column] = null;
            this.setState((state, props) => {
                return { cells: a };
            });
        }
    }

    getCells() {
        let cells = [];
        console.log(new Date() + ' getCells ' + this.state.selectedDigit);
        console.dir(this.state.cells);
        this.state.cells.slice().map((items, index) => {            
            let values = [];
            items.map((subItems, sIndex) => {
                console.log('sIndex ' + sIndex + ' subItems ' + subItems);
                values.push(<Cell
                    key={String.fromCharCode(index + 65) + sIndex}
                    cellkey={(index + 65) + sIndex}
                    position={String.fromCharCode(index + 65) + sIndex}
                    value={subItems}
                    onClick={() => this.handleClick(index, sIndex)} />);
                return null;
            });
            cells.push(<Row
                index={index}
                key={String.fromCharCode(index + 65)}
                rowkey={index}
                value={values} />);
            return null;
        });

        return (
            <div>
                {cells}
            </div>);
    }

    getSelectedDigit() {
        let digitItems = [];
        for (let i = 1; i <= 9; i++) {
            digitItems.push(<Digit
                key={i}
                digitKey={i}
                value={i}
                className={['digit', this.state.selectedDigit === i ? 'digitSelected' : null].join(" ").trim()}
                onClick={() => this.setState({ selectedDigit: i })}
            />);
        }
        return (
            <div className="digits_center" id="digits">
                {digitItems}
            </div>)
    }

    render() {
        return (
            <div>
                {this.getCells()}
                <div className="digits">
                    {this.getSelectedDigit()}
                </div>
            </div>
        );
    }
}

class Sudoku extends React.Component {
    render() {
        return (
            <div className="sudoku">
                <SudokuGrid />
            </div>);
    }
}
// ========================================

ReactDOM.render(
    <Sudoku />,
    document.getElementById('root')
);

//function GetSelectedDigit() {
//    const [selectedDigit, setSelectedDigit] = useState(0);

//    let digitItems = [];
//    for (let i = 1; i <= 9; i++) {
//        digitItems.push(<Digit
//            key={i}
//            digitKey={i}
//            value={i}
//            className={['digit', { selectedDigit } === i ? 'digitSelected' : null ].join(" ").trim()}
//            onClick={() => setSelectedDigit(i)} />);
//    }
//    return (
//        <div className="digits_center" id="digits">
//            {digitItems}
//        </div>
//    )
//}