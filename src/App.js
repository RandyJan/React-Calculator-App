
import './style.css';
import DigitButton from "./DigitButton";
import { useReducer } from "react";
import ClearButton from './ClearButton';
import OperationButton from './OperationButton';

// import {useHistory} from 'react-router-dom';
// import { RedirectFunction } from 'react-router-dom';
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'

}
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:action.payload.digit,
          overwrite:false
        }
      }
      if(action.payload.digit ==="0" && state.currentOperand === "0")return state
      if(action.payload.digit ==="." && state.currentOperand.includes("."))return state
      return {
       
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
      };
      case ACTIONS.CLEAR:
        return{
          currentOperand: null,
          previousOperand:null,
          operation:null
        };
        case ACTIONS.CHOOSE_OPERATION:
          if(state.currentOperand === null && state.previousOperand ===null){
            return state
          }

          if(state.previousOperand ===null){
            return{
              ...state,
              operation: action.payload.operation,
              previousOperand: state.currentOperand,
              currentOperand:null
            }
          }
          case ACTIONS.EVALUATE:
            if(state.currentOperand == null || state.previousOperand == null || state.operation == null){
              return state;
            }
            return{
              overwrite: true,
              previousOperand:null,
              operation:null,
              currentOperand: evaluate(state.currentOperand,state.previousOperand,state.operation)
            }
        case ACTIONS.DELETE_DIGIT:
          if(state.currentOperand === null)return state
          if(state.overwrite)return state
          if(state.currentOperand.length ===1)
          {
            return {
              ...state,
              currentOperand: null
            }
          }
          return{
            ...state,
            currentOperand:state.currentOperand.slice(0,-1)
          }

    // ... (other cases)
  
      return {
        ...state,
        previousOperand: evaluate(state.currentOperand,state.previousOperand,state.operation),
        operation: action.payload.operation,
        currentOperand:null  
      };
  }
}
function evaluate(currentOperand,previousOperand,operation){
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(current)) return null;
  let computation = "";
  switch(operation){
    case"+":
    computation = prev + current;
    break
    case"-":
    computation = prev - current;
    break
    case"/":
     computation= prev/current;
    break
    case "*":
      computation = prev * current
    

  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand === null)
    return
     const[integer, decimal ] = operand.split(".")
     if(decimal == null) return INTEGER_FORMATTER.format(integer)
     return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  
}
function App() {
  const [{ currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer, { 
    currentOperand: null,
    previousOperand:null,
    operation:null
 });
 
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>
        {formatOperand(previousOperand)} {operation}
        </div>
        <div className='current-operand'>
        {formatOperand(currentOperand)}
        </div>
      </div>
          <button className='span-two'onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
          <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
       
          <OperationButton operation="/" dispatch={dispatch}/>
          <DigitButton digit="1" dispatch = {dispatch}/>
          <DigitButton digit="2" dispatch = {dispatch}/>
          <DigitButton digit="3" dispatch = {dispatch}/>

          <OperationButton operation="*" dispatch={dispatch}/>

          <DigitButton digit="4" dispatch = {dispatch}/>
           <DigitButton digit="5" dispatch = {dispatch}/>
           <DigitButton digit="6" dispatch = {dispatch}/>
      
           <OperationButton operation="+" dispatch={dispatch}/>
          <DigitButton digit="7" dispatch = {dispatch}/>
          <DigitButton digit="8" dispatch = {dispatch}/>
          <DigitButton digit="9" dispatch = {dispatch}/>
      
          <OperationButton operation="-" dispatch={dispatch}/>
          {/* <button>.</button> */}
          <DigitButton digit="." dispatch = {dispatch}/>
          <DigitButton digit="0" dispatch = {dispatch}/>

          <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
