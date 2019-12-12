import React from 'react';
import { Router, Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';

import { alertActions } from '../_actions';
import { HomePage } from '../HomePage';
import  {LoginPage}  from '../LoginPage/LoginPage';
import  {LogoutComp} from '../LogoutComp/Logout';
import { Header } from '../_header';
import  NotFound404  from '../NotFound404/NotFound404';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';

import '../css/style.css'
import '../css/react-bootstrap-table-all.min.css'


class App extends React.Component {

    constructor(props) {
        super(props);
        library.add(fas);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }
    render() {
        const {alert} = this.props;
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <Header />
                {/* <Header /> */}
                <div className="content">
                    <div className="col-lg-10 mx-auto">
                        <div className={`alert ${alert.type} d-table container-fluid w-25 text-center mt-5`}>
                            {alert && (
                                        alert.message && (
                                            <div>
                                                <div className="container-fluid error_code">
                                                    <span>{alert.Code?(alert.Code):(' - ')}</span>
                                                </div>
                                                <div>
                                                    {alert.message.message?(alert.message.message):(alert.message)}
                                                </div> 
                                            </div>  
                                        )
                                    )                         
                            }
                        </div>
                        {/* Переписать роутнг красиво((потом), пока пойдёт)) */}
                        <Router history={history}>
                            <Switch>                     
                                <Route exact path="/" render={props => user? (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
                                                                                :(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}/>
                                <Route exact path="/login" render={props =>user? (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />):(<LoginPage />)}/>
                                <Route exact path="/logout" render={props =>user? (<LogoutComp />):(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}/>
                                <Route exact path="/home" render={props =>user? (<HomePage />):(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}/>                                
                                <Route exact path="/404" render={()=><NotFound404/>} />
                                <Redirect from='*' to='/404' />
                            </Switch>                            
                        </Router>     
                    </div>
                </div>
                <footer className="bg-greenColor tc-whiteColor mt-5">
                    <div className="footer-copyright text-center py-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <span>© 2019 ПАО СКБ Приморья «Примсоцбанк». Генеральная лицензия ЦБ РФ № 2733 от 21.08.2015</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert, clients} = state;
    return {
        alert,
        clients,
        state: state,
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

