import React from 'react';
import { userActions } from '../_actions';
// import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';


class LogoutComp extends React.Component {

    constructor(props) {
        super(props);
        // const { cookies } = this.props;
        this.props.dispatch(userActions.logout());
    }
    render(){       
        return(
            <div className="text-center h5">Что-то не сработало</div>
        );
    }
}

// export const LogoutComp = {
//     LogoutComp
// };

// function LogoutComp(cookies) {
//     this.props.dispatch(userActions.logout(cookies));
//     return true;
// }

function mapStateToProps( state) {
    return {
        state
    };
}



const connectedLogoutComp = connect(mapStateToProps)(LogoutComp);
export { connectedLogoutComp as LogoutComp};
// export default withCookies(connect(mapStateToProps)(LogoutComp));