import React from 'react';
import logo from './logo.svg';
import './App.css';

type CellState =
    {
        onClick: Function,        
        value: number,
        position: string,
        cellkey: number;
    };

type CellProps =
    {
        onClick: Function,
        value: number,
        position: string,
        cellkey: number;
    };

class Cell extends React.Component<CellState, CellProps> {
    state: CellState = {
        // optional second annotation for better type inference
        onClick: this.props.onClick,
        value: this.props.value,
        position: this.props.position,
        cellkey: this.props.cellkey,
    };
    onCellClick() {
        console.debug('onCellClick');
        this.state.onClick();
        this.setState((state, props) => {
            return { cellkey: state.cellkey + 200 };
        });
        //console.debug(this.state.position + "\nstate: " + this.state.value + "\nprops: " + this.props.value);
    }
    render() {
        return (<button className="sudokuCell" id={'cell' + this.state.position} key={this.state.cellkey} onClick={() => this.onCellClick()}>
            {this.state.value}
        </button>);
    }
}

type RowState = {
    index: string,
    rowkey: number,
    child_items?: Cell[];
}

type RowProps = {
    index: string,
    rowkey: number,
    child_items?: Cell[];
}

class Row extends React.Component<RowState, RowProps> {
    state: RowState = {
        // optional second annotation for better type inference
        index: this.props.index,
        rowkey: this.props.rowkey,
        child_items: this.props.child_items,        
    };
    onRowClick() {
        this.setState((state, props) => {
            return { rowkey: state.rowkey + 1234 };
        });
    }
    render() {
        return (<div className="sudokuRow" id={this.state.index} key={this.state.rowkey} onClick={() => this.onRowClick()}>{this.state.child_items}</div>);
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
        this.state.onClick(this.state.value);

        this.setState((state, props) => {
            return { digitKey: state.digitKey + 100 };
        });
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
            a[row][column] = -1;
            this.setState((state, props) => {
                return { cells: a };
            });
        }
    }

    getCells() {
        let cells: Row[];
        console.log(new Date() + ' getCells ' + this.state.selectedDigit);
        console.dir(this.state.cells);
        //this.state.cells.slice().map((items, index) => {
        //    let values: Cell[];
        //    items.map((subItems, sIndex) => {
        //        console.log('sIndex ' + sIndex + ' subItems ' + subItems);
        //        values.push(<Cell
        //            key={String.fromCharCode(index + 65) + sIndex}
        //            cellkey={(index + 65) + sIndex}
        //            position={String.fromCharCode(index + 65) + sIndex}
        //            value={subItems}
        //            onClick={() => this.handleClick(index, sIndex)} />);
        //        return null;
        //    });
        //    cells.push(<Row
        //        index={index.toString()}                
        //        rowkey={index}
        //        value={values} />);
        //    return null;
        //});

        return (
            <div>
                <Row index="1" rowkey={1}>                    
                    <Cell key={String.fromCharCode(1 + 65) + 1} cellkey={(1 + 65) + 1} position={String.fromCharCode(1 + 65) + 2} onClick={() => this.handleClick(1, 1)} value={ 1 } />
                    <Cell key={String.fromCharCode(1 + 65) + 2} cellkey={(1 + 65) + 2} position={String.fromCharCode(1 + 65) + 2} onClick={() => this.handleClick(1, 2)} value={1} />                    
                </Row>
                
            </div>);
    }

    getSelectedDigit() {
        let digitItems: Digit[] = [];
        let isFalse: boolean = false;
        //for (let i = 1; i <= 9; i++) {
        //    digitItems.push(<Digit
        //        key={i}
        //        digitKey={i}
        //        active= isFalse
        //        value={i}
        //        className={['digit', this.state.selectedDigit === i ? 'digitSelected' : null].join(" ").trim()}
        //        onClick={() => this.setState({ selectedDigit: i })}
        //    />);
        //}
        return (
            <div className="digits_center" id="digits">
                <Digit key={1} digitKey={1} active={isFalse} value={1} className={['digit', this.state.selectedDigit === 1 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 1 })} />
                <Digit key={2} digitKey={2} active={isFalse} value={2} className={['digit', this.state.selectedDigit === 2 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 2 })} />
                <Digit key={3} digitKey={3} active={isFalse} value={3} className={['digit', this.state.selectedDigit === 3 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 3 })} />
                <Digit key={4} digitKey={4} active={isFalse} value={4} className={['digit', this.state.selectedDigit === 4 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 4 })} />
                <Digit key={5} digitKey={5} active={isFalse} value={5} className={['digit', this.state.selectedDigit === 5 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 5 })} />
                <Digit key={6} digitKey={6} active={isFalse} value={6} className={['digit', this.state.selectedDigit === 6 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 6 })} />
                <Digit key={7} digitKey={7} active={isFalse} value={7} className={['digit', this.state.selectedDigit === 7 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 7 })} />
                <Digit key={8} digitKey={8} active={isFalse} value={8} className={['digit', this.state.selectedDigit === 8 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 8 })} />
                <Digit key={9} digitKey={9} active={isFalse} value={9} className={['digit', this.state.selectedDigit === 9 ? 'digitSelected' : null].join(" ").trim()} onClick={() => this.setState({ selectedDigit: 9 })} />
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
                <SudokuGrid cells={Array(9).fill(-1).map(() => new Array(9).fill(-1)) } selectedDigit={ -1 } />
            </div>);
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
