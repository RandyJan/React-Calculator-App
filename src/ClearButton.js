import { ACTIONS } from "./App";
export default function ClearButton({dispatch}){
 return <button onClick = {()=>dispatch({type:ACTIONS.CLEAR})}>DEL</button>
}