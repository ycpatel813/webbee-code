export const ADD_MACHINE_TYPE = 'ADD_MACHINE_TYPE';
export const EDIT_MACHINE_TYPE = 'EDIT_MACHINE_TYPE';
export const DELETE_MACHINE_TYPE = 'DELETE_MACHINE_TYPE';

let initialState = [];
try{
    if(localStorage.getItem("machineTypes")) {
        initialState = JSON.parse(localStorage.getItem("machineTypes"))
    }
} catch(e) {
    initialState = []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MACHINE_TYPE:
            const copyState = [...state];
            copyState.push(action.payload)
            localStorage.setItem("machineTypes", JSON.stringify(copyState));
            return copyState;

        case EDIT_MACHINE_TYPE:
            const updateState = [...state];
            const findIndex = updateState.findIndex(type => type._id === action.payload._id)
            updateState[findIndex] = action.payload;
            localStorage.setItem("machineTypes", JSON.stringify(updateState));
            return updateState;


        case DELETE_MACHINE_TYPE:
            const deleteState = [...state];
            deleteState.splice(action.payload, 1);
            localStorage.setItem("machineTypes", JSON.stringify(deleteState));
            return deleteState;

        default:
            return state;
    }
};

export const addMachineType = (payload) => {
    return {
        type: ADD_MACHINE_TYPE,
        payload
    };
};

export const editMachineType = (payload) => {
    return {
        type: EDIT_MACHINE_TYPE,
        payload
    };
};

export const deleteMachineType = (payload) => {
    return {
        type: DELETE_MACHINE_TYPE,
        payload
    };
}