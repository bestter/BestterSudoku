import React from 'react';
import { DateTime } from 'luxon';
//import logo from './logo.svg';
import './App.css';

type CellState =
    {
        onClick: Function,
        value: number,
        position: string,
        key: number;
    };

type CellProps =
    {
        onClick: Function,
        value: number,
        position: string,
        key: number;
    };

class Cell extends React.Component<CellState, CellProps> {
    state: CellState = {
        // optional second annotation for better type inference
        onClick: this.props.onClick,
        value: this.props.value,
        position: this.props.position,
        key: this.props.key,
    };
    onCellClick() {        
        this.state.onClick();
        this.setState((state, props) => {
            return { key: state.key + 200 };
        });
        console.debug('onCellClick ' + this.state.value.toString() + ' ' + DateTime.now().toISO());
    }
    render() {
        console.debug('CELL: ' + this.state.position + ' ' + this.state.value + ' ' + DateTime.now().toISO());
        return (<button className="sudokuCell" id={'cell' + this.state.position} key={this.state.key} onClick={() => this.onCellClick()}>
            {this.state.value === -1 ? "" : this.state.value.toString()}
        </button>);
    }
}

type RowState = {
    index: string,
    key: number,
    cells?: JSX.Element[];
}

type RowProps = {
    index: string,
    key: number,
    cells?: JSX.Element[];
}

class Row extends React.Component<RowState, RowProps> {
    
    state: RowState = {
        // optional second annotation for better type inference
        index: this.props.index,
        key: this.props.key,
        cells: this.props.cells,
    };
    onRowClick() {        
        console.debug('onRowClick ' + this.state.index + ' ' + DateTime.now().toISO());
        this.setState((state, props) => {
            return { key: state.key + 1234 };
        });
    }
    render() {
        console.debug('Row: ' + this.state.index + ' ' + DateTime.now().toISO());
        return (<div className="sudokuRow" id={this.state.index} key={this.state.key } onClick={() => this.onRowClick()}>{this.state.cells}</div>);
    }
}

type DigitState = {
    value: number,
    onClick: Function,
    active: boolean,
    className: string,
    digitKey: number,
}

type DigitProps = {
    value: number,
    onClick: Function,
    active: boolean,
    className: string,
    digitKey: number,
}

class Digit extends React.Component<DigitState, DigitProps> {

    state: DigitState = {
        // optional second annotation for better type inference
        value: this.props.value,
        onClick: this.props.onClick,
        active: this.props.active,
        className: this.props.className,
        digitKey: this.props.digitKey,
    };
    onDigitClick() {       
        this.setState((state, props) => {
            return { digitKey: state.digitKey + 100 };
        });
        this.state.onClick(this.state.value);
    }
    render() {
        return (<button id={'digit' + this.state.value} key={this.state.digitKey} className={this.props.className} onClick={() => this.onDigitClick()}>{this.state.value}</button>)
    }
}
type SudokuGridState =
    {
        cells: number[][],
        selectedDigit: number;
    };

type SudokuGridProps =
    {
        cells: number[][],
        selectedDigit: number;
    };

class SudokuGrid extends React.Component<SudokuGridState, SudokuGridProps>{

    state: SudokuGridState = {
        // optional second annotation for better type inference
        cells: this.props.cells,
        selectedDigit: this.props.selectedDigit,
    };
    handleClick(row: number, column: number) {        
        console.log('handleClick ' + this.state.selectedDigit + ' row ' + row + ' column ' + column + ' ' + DateTime.now().toISO());
        if (this.state.selectedDigit > -1) {            
            let a = this.state.cells.slice(); //creates the clone of the state
            a[row][column] = this.state.selectedDigit;
            this.setState((state, props) => {
                return { cells: a };
            });
            console.dir(a);
        }
        else {
            let a = this.state.cells.slice(); //creates the clone of the state
            a[row][column] = -1;
            this.setState((state, props) => {
                return { cells: a };
            });
        }
    }
    setSelectedDigit(digit: number) {
        this.setState((state, props) => {
            return { selectedDigit: digit };
        });
    }

    getCells(rowIndex: number, values: number[]): JSX.Element[] {
        debugger;
        const cells = values.slice().map((item, index) => (            
            <Cell
                key={(rowIndex + 65) + index}                
                position={String.fromCharCode(rowIndex + 65) + index}
                value={item}
                onClick={() => this.handleClick(rowIndex, index)} />
        ));                
        return (cells);
    }

    getRows() {
        console.debug('getRows() ' + DateTime.now().toISO());        
        const rows = this.state.cells.slice().map((items, index) => (            
            <Row index={index.toString()} key={index} cells={this.getCells(index, items)} />
        ));

        return (
            <div className="sudokuGrid">
                { rows }                
            </div>);
    }

    getSelectedDigit() {
        let isFalse: boolean = false;
       
        return (
            <div className="digits_center" id="digits">
                <Digit key={1} digitKey={1} active={isFalse} value={1} className={['digit', this.state.selectedDigit === 1 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(1)} />
                <Digit key={2} digitKey={2} active={isFalse} value={2} className={['digit', this.state.selectedDigit === 2 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(2)} />
                <Digit key={3} digitKey={3} active={isFalse} value={3} className={['digit', this.state.selectedDigit === 3 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(3)} />
                <Digit key={4} digitKey={4} active={isFalse} value={4} className={['digit', this.state.selectedDigit === 4 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(4)} />
                <Digit key={5} digitKey={5} active={isFalse} value={5} className={['digit', this.state.selectedDigit === 5 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(5)} />
                <Digit key={6} digitKey={6} active={isFalse} value={6} className={['digit', this.state.selectedDigit === 6 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(6)} />
                <Digit key={7} digitKey={7} active={isFalse} value={7} className={['digit', this.state.selectedDigit === 7 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(7)} />
                <Digit key={8} digitKey={8} active={isFalse} value={8} className={['digit', this.state.selectedDigit === 8 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(8)} />
                <Digit key={9} digitKey={9} active={isFalse} value={9} className={['digit', this.state.selectedDigit === 9 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setSelectedDigit(9)} />
            </div>)
    }

    render() {
        return (
            <div>
                {this.getRows()}
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
                <SudokuGrid cells={Array(9).fill(-1).map(() => new Array(9).fill(-1))} selectedDigit={-1} />
            </div>);
    }
}

function App() {
    return (
        <div className="App">
            <Sudoku />
        </div>
    );
}

export default App;
