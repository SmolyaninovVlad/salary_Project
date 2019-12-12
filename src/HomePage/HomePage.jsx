import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Salary_list} from '../form_elements'

// import { userActions } from '../_actions';

class HomePage extends React.Component {
    UNSAFE_componentWillMount() {
        document.title = 'Salary'
    }
    render() {
        // const { user, users } = this.props;
        return (
            <div className="row mb-5">
                <div className="col-md-12 mx-auto">
                    <div className="container-fluid mt-5">
                        <Salary_list/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };