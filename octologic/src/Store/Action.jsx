import Store from "./Store";

export function ActionCourse (value){
    Store.dispatch({
        type:'COURSEDATA',
        payload:value
    })
}
export function ActionAll (value){
    Store.dispatch({
        type:'ALLDATA',
        payload:value
    })
}
