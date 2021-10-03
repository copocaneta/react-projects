import React from 'react';
import './calculadora.css';


const operators = [
  {
    operator: '=',
    operatorSign: '=Enter',
    operatorId: 'equals',
  },
  {
    operator: '+' ,
    operatorSign: '+',
    operatorId: 'add',
  },
  {
    operator: '-' ,
    operatorSign: '-',
    operatorId: 'subtract',
  },
  {
    operator: '*' ,
    operatorSign: '*',
    operatorId: 'multiply',
  },
  {
    operator: '/' ,
    operatorSign: '/',
    operatorId: 'divide',
  },
  {
    operator: 'clear' ,
    operatorSign: 'clear',
    operatorId: 'clear',
  },
];

const numbers = [
  {
    number: 0,
    numberId: 'zero',
  },
    {
    number: 1,
    numberId: 'one',
  },
    {
    number: 2,
    numberId: 'two',
  },
    {
    number: 3,
    numberId: 'three',
  },
    {
    number: 4,
    numberId: 'four',
  },
    {
    number: 5,
    numberId: 'five',
  },
    {
    number: 6,
    numberId: 'six',
  },
    {
    number: 7,
    numberId: 'seven',
  },
    {
    number: 8,
    numberId: 'eight',
  },
    {
    number: 9,
    numberId: 'nine',
  },
  {
    number: '.',
    numberId: 'decimal',
  }
]

class Calculadora extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      numbers: numbers,
      operators: operators,
      pressedPad: [],
      operation: '',
      operationParts: [],
    }

    this.registerPressedNumber = this.registerPressedNumber.bind(this);
    this.registerOperation = this.registerOperation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clearCalc = this.clearCalc.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.simulateButtonClick = this.simulateButtonClick.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown (e) {


    const pressedKey = e.key;
    // console.log(pressedKey);


    // /[+\-*/=]*[0-9]*/
    // if (/[+\-*/=Enter]/.test(pressedKey) && this.state.operators.filter(item => item.operatorSign.includes(pressedKey)).length > 0){
    // /[+\-*/=]|(\bEnter\b)|(\bBackspace\b)+/
     if (/[+\-*/=]|(\bEnter\b)+/.test(pressedKey) && this.state.operators.filter(item => item.operatorSign.includes(pressedKey)).length > 0){
      this.registerOperation(e);
    }

    if (/[0-9\.]/.test(pressedKey) &&  this.state.numbers.filter(item => item.number == pressedKey).length > 0) {
      this.registerPressedNumber(e);
    }

    if (/(\bBackspace\b)+/.test(pressedKey)) {
      console.log(this.state.pressedPad);
      if (this.state.pressedPad[0] && this.state.pressedPad[0].length > 1) {
        // console.log(this.state.operationParts);
        // if (this.state.operationParts[1])
        if (this.state.operationParts[1] === undefined){
          this.setState((state) => {
            const currentPressedPad = state.pressedPad[0].split('').slice(0, -1).join('');
            return {
              pressedPad: [currentPressedPad],
              operationParts: [currentPressedPad]
            }
          });
        } else {
          this.setState((state) => {
            const currentPressedPad = state.pressedPad[0].split('').slice(0, -1).join('');
            const newOperationParts = state.operationParts;
            newOperationParts[1] = currentPressedPad;

            return {
              pressedPad: [currentPressedPad],
              operationParts: newOperationParts
            }
          });


        }

      } else {
        if (this.state.operationParts[1] === undefined){
          this.setState((state) => {
            const currentPressedPad = '0';
            return {
              pressedPad: [currentPressedPad],
              operationParts: [currentPressedPad]
            }
          });
        } else {
          this.setState((state) => {
            const currentPressedPad = '0';
            const newOperationParts = state.operationParts;
            newOperationParts[1] = currentPressedPad;
            return {
              pressedPad: [currentPressedPad],
              operationParts: newOperationParts
            }
          });
        }

      }


    }

  }

  simulateButtonClick(element) {
    element.classList.toggle('pressedButton');
    setTimeout(() => {
      element.classList.toggle('pressedButton');
    },100)
  }

  registerPressedNumber(e) {
    // console.log(e.target.textContent)
    let number;

    if (e.type === 'click') {
      number = e.target.textContent;
    } else {
      number = e.key;
      // console.log(number);
      switch (number) {
        case '0':
          this.simulateButtonClick(this.number0Ref);
          break;
        case '1':
          this.simulateButtonClick(this.number1Ref);
          break;
        case '2':
          this.simulateButtonClick(this.number2Ref);
          break;
        case '3':
          this.simulateButtonClick(this.number3Ref);
          break;
        case '4':
          this.simulateButtonClick(this.number4Ref);
          break;
        case '5':
          this.simulateButtonClick(this.number5Ref);
          break;
        case '6':
          this.simulateButtonClick(this.number6Ref);
          break;
        case '7':
          this.simulateButtonClick(this.number7Ref);
          break;
        case '8':
          this.simulateButtonClick(this.number8Ref);
          break;
        case '9':
          this.simulateButtonClick(this.number9Ref);
          break;
        case '.':
          this.simulateButtonClick(this.numberDotRef);
          break;
        default:
          console.log('no match');
          break;
      }
    }

    this.setState((state) => {
      let newPressedPad;
      let joinedPressedPad;
      let newOperationParts;

      if (state.pressedPad[0] === 0){

        newPressedPad = [number];

      } else {

        newPressedPad = state.pressedPad.concat(number);

      }

      joinedPressedPad = newPressedPad.join('');


      if ((state.operationParts[0] === undefined || state.operationParts[0] === 0) && state.operation === '') {

        return {pressedPad: [joinedPressedPad],
                operationParts: [joinedPressedPad],
               };

      } else if (state.operationParts[0] !== undefined && state.operation !== '') {

        // not allowing the operation part on the second part to start with
        // multiple zeros
        if (state.operationParts[1] && state.operationParts[1][0] === 0 && state.operationParts[1].length === 1) {
          if (number === 0) {
            number = '';
          }
        }

        // not allowing multiple dots

        if (state.operationParts[1] && state.operationParts[1].includes('.') ) {
          if (number === '.') {
            number = '';
          }

        }

        if (state.operationParts[1] && parseFloat(state.operationParts[1][0]) === 0 && state.operationParts[1].length === 1) {

          newPressedPad = [number];

        } else {
          newPressedPad = state.pressedPad.concat(number);
        }

        joinedPressedPad = newPressedPad.join('');

        newOperationParts = state.operationParts;

        newOperationParts[1] = joinedPressedPad;
        return {pressedPad: [joinedPressedPad],
                operationParts: newOperationParts};
      } else {
        // not allowing the operation part on the first part to start with
        // multiple zeros
        if (state.operationParts[0] && parseFloat(state.operationParts[0][0]) === 0 && state.operationParts[0].length === 1) {
          if (number === 0) {
            number = '';
          }
        }

        // not allowing multiple dots

        if (state.operationParts[0] && state.operationParts[0].includes('.') ) {
          if (number === '.') {
            number = '';
          }

        }

        newPressedPad= state.pressedPad.concat(number);

        // console.log(state.operationParts);

        if (state.operationParts[0] && state.operationParts[0].length === 1 && parseFloat(state.operationParts[0]) === 0 ) {
          newPressedPad = [number];
        }

//         if (state.operationParts[1] && state.operationParts[1].length == 1 && state.operationParts[1] == 0 ) {

//           newPressedPad = [number];
//         }


        joinedPressedPad = newPressedPad.join('');

        return {pressedPad: [joinedPressedPad],
                operationParts: [joinedPressedPad],
               };

      }

    })

  }
  registerOperation(e){

      let operator;

      if (e.type === 'click') {
        operator = e.target.textContent;
      } else {
        if (e.key === 'Enter'){
          operator = '=';
        } else {
          operator = e.key;
          console.log(operator);
          switch (operator) {
            case '-':
              this.simulateButtonClick(this.operatorsubtractRef);
              break;
            case '/':
              this.simulateButtonClick(this.operatordivideRef);
              break;
            case '*':
              this.simulateButtonClick(this.operatormultiplyRef);
              break;
            case '+':
              this.simulateButtonClick(this.operatoraddRef);
              break;
            case 'equals':
              this.simulateButtonClick(this.operatorequalsRef);
              break;
            default:
              console.log('no match');
              break;
          }
        }

      }

      // console.log(operator);
      let signedPressedPad;
      if (operator === 'clear') {
        this.clearCalc()

      } else {
        // console.log(this.state.operationParts[1]);
        if (operator !== '=' && this.state.operationParts[1] !== 'undefined') {

          this.setState((state) => {

            let operationParts = state.operationParts;

            if (this.state.operationParts[1] !== '') {
              operationParts = state.operationParts.concat('');
            }

            if (state.operation !== ''  && operator === '-' && this.state.operationParts[1] === ''){

              operator = state.operation;
              signedPressedPad = '-';

            }

            return {
              operation: operator,
              pressedPad: [signedPressedPad],
              operationParts: operationParts}

          });

        }

        if (operator === '=' && this.state.operationParts[1] !== undefined) {
          this.calculate(this.state.operationParts[0], this.state.operationParts[1]);
        } else if (operator !== '=' && this.state.operationParts[1] !== undefined) {
          // console.log('entramos na conta seguida');
          if (operator !== '-') {

            if (this.state.operationParts[1] !== '') {

              this.calculate(this.state.operationParts[0], this.state.operationParts[1]);

            }

            this.setState((state) => {
              return {
                operation: operator,
              }
            });

          } else {

            if (this.state.operationParts[1] === '') {

              if (this.state.operation !== '') {

                this.setState((state) => {
                  return {
                    operation: state.operation,
                  }
                });

              }


            } else {
              // se a segunda parte da operacao nao estiver vazia
              // entao calculo
              this.calculate(this.state.operationParts[0], this.state.operationParts[1]);
              // e adiciono o menos no state operation
              this.setState((state) => {
                return {
                  operation: operator,
                }
              });
            }
          }
        }
     }
  }
  calculate(a, b) {

    let result;
    switch(this.state.operation) {
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
      case '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case '*':
        result = parseFloat(a) * parseFloat(b);
        break;
      case '/':
        result = parseFloat(a) / parseFloat(b);
        break;
      default:
        console.log(`Sorry, something went wrong!`);

    }
    this.setState((state) => {
      return {
        operationParts: [result],
        pressedPad: [],
        operation: '',
      }
    });
  }
  clearCalc() {

    this.setState((state) => {
      return {
        operation: '',
        pressedPad: [0],
        operationParts: [0],
      }
    })

  }
  render(){

    const numbers = this.state.numbers.map(item => {
      return (
        <button key={item.numberId} className={`${item.number === 0 ? "numberZero" : "numberButtons"}`} id={item.numberId} onClick={this.registerPressedNumber} ref={(ref) => item.number !== '.' ? this[`number${item.number}Ref`] = ref : this[`numberDotRef`] = ref}>{item.number}</button>
        // this.number1Ref
      );
    });
    // console.log(numbers);
    const operators = this.state.operators.map(item => {
      return (
        <button key={item.operatorId} id={item.operatorId} className="operatorButtons" onClick={this.registerOperation} ref={(ref) => this[`operator${item.operatorId}Ref`] = ref}>{item.operator}</button>
      )
    });

    return (

      <div className="calculadoraToda">
        <div className="botoesCalculadora">
          <div className="numbers">{numbers}<div id="divDisplay"><span id="display">{this.state.operationParts[0]} {this.state.operation} {this.state.operationParts[1]}</span></div></div>

          <div className="operators">{operators}</div>
          {/*<div>Pressed Numbers: {this.state.pressedPad}</div>*/}
        </div>
      </div>
    );
  }
}

export default Calculadora;