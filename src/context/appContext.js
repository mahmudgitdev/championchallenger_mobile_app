import globalContextCreator from "./globalContextCreator";

const initialState = {
    token:''
}

const appReducer = (state,actions)=>{
    switch(actions.type){
        case 'update_token':
            return{
                ...state,
                token:actions.payload
            }
        default:
            return state;

    }
}

const updateToken =  (dispatch) =>{
    return async (token)=>{
     dispatch({
         type:'update_token',
         payload:token
        });
    };
 }
 export const {Context,Provider} = globalContextCreator(appReducer,{updateToken},initialState);