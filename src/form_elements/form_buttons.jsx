import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { userService } from '../_services';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}

class BootstrapButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            modalTitle: '',
            approving: false,
            approved: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.SuccessClick = this.SuccessClick.bind(this);
        this.setCard= this.setCard.bind(this);
    }
    openModal(Title) {
        this.setState({
            modalTitle:Title,
            modalIsOpen: true,
        });
    }
    setCard(e){
        e.preventDefault();
        this.setState({ approving: true });
        userService.ApproveProjectRequest(this.props.row['clientID'],this.props.row['depositID'],this.props.row['phone_relevant']).then((response) => {
            console.log(response);
            this.setState({ 
                approving: false, 
                approved: response
            });
        })
        .catch((err) => {
            if (err.isRefresh) {this.setCard(e); return;}
            this.setState({ 
                approving: false, 
                approved: err
            });
        });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    SuccessClick() {
        this.openModal("Утверждение проекта");
    }
    
    render() {
        let { approving, approved } = this.state;
        let responseClass = '';
        let responseIcon = '';
        let responseIconSmall = '';
        //Определение класса для отоьбражения
        if (approved.Code === 200 || approved.Code === 201) {
            responseClass='success'; 
            responseIcon=<i className="fas fa-check-circle fa-2x"></i>;
            responseIconSmall=<i style={ {color:"green"} } className="fas fa-check-circle"></i>;
        } else { 
            responseClass='failure';
            responseIcon=<i className="fas fa-times-circle fa-2x"></i>;
            responseIconSmall=<i style={ {color:"red"} } className="fas fa-times-circle"></i>;
        }
        return (
        <div>
            <div>
                <div className="text-center">
                    <button type="button" className="btn btn-success" onClick={this.SuccessClick}>Утвердить</button>
                    {(approving || approved) && 
                        <span className="TableIcon">
                            {approving? (
                                <span className="loader"><i className="fas fa-spinner fa-pulse"></i></span>
                                ):(responseIconSmall)
                            }
                        </span>
                    }
                </div>
            </div>
            <ReactModal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>
                {(approving || approved) && 
                    <div className="overlay">
                        <div>
                            {approving? (
                                <span className="loader"><i className="fas fa-spinner fa-pulse fa-3x"></i></span>
                            ):( <div className={" requestMessage " + responseClass}>
                                    <span className="loader">{responseIcon}</span>
                                    <div className="label message">
                                        <div>
                                            <span>{approved.Code === 200? ("Успешно") : ("Обработать ответ")}</span>
                                        </div>                                    
                                    </div>
                                    <div className="label exitBtn">
                                        <button className="btn btn-primary btnModal" onClick={this.closeModal}>Закрыть</button>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                }
                <div className="container-fluid">
                    <div className="row form-group modal-header">  
                        <h3 ref={subtitle => this.subtitle = subtitle}>{this.state['modalTitle']}</h3>  
                    </div>
                    <div className="container-fluid modal-body">  
                        <div className="row form-group">                
                            <div className="col-lg-7"><span>ФИО Клиента</span></div>
                            <div className="col-lg-5">{this.props['row']['clientName']}</div>
                        </div>
                        <div className="row form-group">   
                            <div className="col-lg-7"><span>№ Счета СКС</span></div>             
                            <div className="col-lg-5">{this.props['row']['account']}</div>
                        </div>
                        <div className="row form-group">      
                            <div className="col-lg-7"><span>Наименование организации ЗП проект</span></div>            
                            <div className="col-lg-5">{this.props['row']['orgName']}</div>
                        </div>
                        <div className="row form-group">  
                            <div className="col-lg-7"><span>Номер телефона в Системе</span></div>                
                            <div className="col-lg-5">{this.props['row']['phone']}</div>
                        </div>    
                        <div className="row form-group">  
                            <div className="col-lg-7"><span>Актуальный номер телефона</span></div>                
                            <div className="col-lg-5">{this.props['row']['phone_relevant']}</div>
                        </div>                 
                    </div>
                    <div className="container"> 
                        <div className="row form-group"> 
                            <div className="mx-auto">          
                                <button className="btn btn-primary btnModal" onClick={this.setCard}>Утвердить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
        );
    }
}


function mapStateToProps(state) {
    const  {approvingResponse}  = state;
    return {
        approvingResponse
    };
}

const connectedBootstrapButton = connect(mapStateToProps)(BootstrapButton);
export { connectedBootstrapButton as  BootstrapButton};