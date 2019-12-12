import React from 'react';
import { connect } from 'react-redux';
// import { withCookies } from 'react-cookie';
import { userActions } from '../_actions';
import {Form_errors} from '../form_Errors';


class LoginPage extends React.Component {
    UNSAFE_componentWillMount() {
        document.title = 'Авторизация'
    }

    constructor(props) {
        super(props);
        // const { cookies } = props;
        this.props.dispatch(userActions.logout());
        this.state = {
            email:'',
            password:'',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {    
            dispatch(userActions.login(email, password ));
        }
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            {[name]: value}
        );
        this.validateField(name, value);        
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' Email введён неверно';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' Минимальная длина пароля 6 символов';
                break;
            default:
                break;
        }
        this.setState(
                        {
                            formErrors: fieldValidationErrors,
                            emailValid: emailValid,
                            passwordValid: passwordValid,
                            formValid: emailValid && passwordValid
                        }
                    );
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    
    render () {
    const { loggingIn } = this.props;
    const { email, password, formErrors,formValid } = this.state;
    return (
        <div className="container-fluid mt-5">
            <div className="block_auth">
                <div className="fullHeight container">
            <div className="fullHeight col pt-2 pb-2 form-horizontal">    
                <div className="text-center logotip headerImg">
                    <img src="../img/icons8-user-location-80.png"/>    
                </div>                
                <div className="form-group mb-0 text-center mt-5">
                    <label className="LabelText">
                        Авторизация
                    </label>
                </div> 
                <div className="form-group mb-0 d-flex">
                <form className="demoForm w-100 my-auto" onSubmit={this.handleSubmit}>
                    <div className={'form-group mb-4 mt-4 ${this.errorClass(formErrors.email)}'}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange}/>
                    </div>
                    <div className={'form-group mb-4 ${this.errorClass(formErrors.password)}'}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group mb-4 mt-2 text-center">
                        <button type="submit" className="btn btn-primary loader" disabled={!formValid || loggingIn}><span>{loggingIn? <img src="../img/loader.svg"/> : 'Вход'}</span></button>
                    </div>
                    <div className="panel panel-default">
                        <Form_errors formErrors={formErrors} />
                    </div>
                </form>
                </div>                
                <div className="form-group mb-0 text-center">
                    Забыли пароль? <a href="#">Восстановить</a>
                </div>
            </div>
        </div>            
            </div>
        </div>
    )
    }
}

function mapStateToProps(state) {
    return {
        loggingIn: state.authentication,
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage};
// export default withCookies(connect(mapStateToProps)(LoginPage));