
import { SET_USER } from '../actions/constants'
import { CHECK_SESSION } from '../actions/constants'

const initailState = {
    member: '',
    user: '',

}

const memberReducer = (state = initailState, action) => {
    console.log("memberReducer ,action.type:", action.type)
    switch (action.type) {

        case SET_USER: {

            const newState = { ...state, member: action.payload }

            console.log("memberReducer SET_USER ,action.payload:", newState)
            return newState
        }
        case CHECK_SESSION: {
            const newState = { ...state, user: action.payload }
            console.log("memberReducer CHECK_SESSION ,action.payload:", newState)
            return newState
        }

        default:
            return state
    }
}


export default memberReducer;