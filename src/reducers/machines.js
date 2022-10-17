export const ADD_MACHINES = 'ADD_MACHINES';
export const EDIT_MACHINES = 'EDIT_MACHINES';
export const DELETE_MACHINES = 'DELETE_MACHINES';

let initialState = [];
try{
    if(localStorage.getItem("machines")) {
        initialState = JSON.parse(localStorage.getItem("machines"))
    }
} catch(e) {
    initialState = []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MACHINES:
            const copyState = [...state];
            copyState.push(action.payload)
            localStorage.setItem("machines", JSON.stringify(copyState));
            return copyState;

        case EDIT_MACHINES:
            return {
                ...state,
                count: state.count + 1,
                isIncrementing: !state.isIncrementing
            };

        case DELETE_MACHINES:
            const deleteState = [...state];
            deleteState.splice(action.payload, 1);
            localStorage.setItem("machines", JSON.stringify(deleteState));
            return deleteState;

        default:
            return state;
    }
};

export const addMachine = (payload) => {
    return {
        type: ADD_MACHINES,
        payload
    };
};

export const deleteMachine = (payload) => {
    return {
        type: DELETE_MACHINES,
        payload
    };
}