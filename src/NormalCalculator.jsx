import { useReducer } from 'react';
import CalculatorBody from './CalculatorBody';

export const ACTION = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
    PERCENT: 'percent',
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                };
            }
            if (payload.digit === '0' && state.currentOperand === '0') return state;
            if (payload.digit === '.' && state.currentOperand.includes('.')) return state;

            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            };

        case ACTION.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state;
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                };
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                };
            }


            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            };

        case ACTION.CLEAR:
            return {};

        case ACTION.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                };
            }
            if (state.currentOperand == null) return state;
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                };
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            };

        case ACTION.EVALUATE:
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state;
            }
          
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            };
        case ACTION.PERCENT:
            // if (state.currentOperand == null) return state;
            return {
                ...state,
                currentOperand: evaluate({ currentOperand, previousOperand: '0', operation: '%' })
            };
    }
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return '';
    let computation = '';
    switch (operation) {
        case '+':
            computation = prev + current;

            break;
        case '-':
            computation = prev - current;

            break;
        case '*':
            computation = prev * current;

            break;
        case '÷':
            computation = prev / current;

            break;
        case '%':
           computation = prev / 100 * current;

            break;
    }

    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0
});

function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);

    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}


function NormalCalculator() {

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});



    return (

        <div className="calculator_container">
            <h1>Normal Calculator</h1>
            <CalculatorBody
                currentOperand={currentOperand}
                dispatch={dispatch}
                formatOperand={formatOperand}
                operation={operation}
                previousOperand={previousOperand}
            />

        </div>


    );
}

export default NormalCalculator;
