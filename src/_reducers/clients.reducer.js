
export function clients(state = {}, action) {

    switch (action.type) {
        case "GOT_IT":
            return action.clients
        case "DID_NOT_GET_IT":
            return action.clients
        default:
            return state
        }
}