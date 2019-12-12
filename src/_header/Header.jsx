import React from 'react';
import { connect } from 'react-redux';
class Header extends React.Component {
    constructor(props){
        super(props);  
        this.state = {
            showModal:false
        }
    }
    handleModal(show){
        this.setState(
            {showModal: show}
        );
    }
    render () {        
        let { showModal }=this.state;
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <header className="pt-3 pb-3 position-relative" role="banner">
                <div className="row col-lg-12">
                    <div className="row">
                        <div className="col d-flex">
                            <div className="col-md-3 logotip">
                                <img src="../img/pskb-logo.png"/>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center text-white d-inline-flex my-auto"> 
                            { user &&                          
                            <div className="profile" onMouseEnter={this.handleModal.bind(this, true) } onMouseLeave={this.handleModal.bind(this, false)}>   
                                    <div>{ user.name }
                                        <span className="profile_btn">
                                            <i className="fas fa-angle-down"></i>
                                        </span>   
                                    </div>                             
                            </div>   
                            }                         
                        </div>
                    </div>
                </div>
                {/* Доделать выезжающий блок вниз и в нём кнопка выхода */}
                {showModal &&
                    <div className="row col-lg-12 position-absolute" onMouseEnter={this.handleModal.bind(this, true) } onMouseLeave={this.handleModal.bind(this, false)}>
                        <div className="row">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-4 text-center text-white d-inline-flex my-auto">
                                <div className="col-lg-2"></div>
                                <div className="col-lg-10">                                    
                                    <div className="profileModal">
                                        <div>
                                            <div>
                                                <span>Выйти из системы</span>
                                            </div>
                                            <div>
                                                <a href='/logout'>
                                                    <span>Выход <i className="fas fa-door-open"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </header>              
        )
    }
}




function mapStateToProps(state) {
    return {
        state: state
    };
}   


const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };