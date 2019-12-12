import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {BootstrapButton} from './form_buttons';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Salary_list extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            options : {
                exportCSVBtn: this.createCustomExportCSVButton,
                paginationShowsTotal: this.renderPaginationShowsTotal
            },
            cellEditProp : {
                mode: 'click',
                blurToEscape: true
            },
        }            
        this.props.dispatch(userActions.getClients());
    }
      

    renderPaginationShowsTotal(start, to, total) {
        return (
          <p style={ { color: '#a1a1a1', fontSize: '12px', marginBottom: '0'} }>
            Элементы с { start } по { to } всего { total }
          </p>
        );
      }

    //Обработчики действий таблицы{   
    createCustomExportCSVButton(){
        return (
            <ExportCSVButton
            btnText='Export to CSV'
            className='Excel_btn'/>
        );
    }
    //Обработчики действий таблицы}

    //Стилизация кнопок для таблицы{
    createCustomInsertButton(onClick){
        return (
          <InsertButton
            btnText='Новый элемент'
            btnContextual='btn-warning'
            className='add_row'/>
        );
    }

    buttonFormatter(cell, row){
        return (<BootstrapButton row={row}></BootstrapButton>);
    }
    //Стилизация кнопок для таблицы}

    indexRow(cell, row, enumObject, rowIndex) {
        return (<div><span style={{fontSize:"9px"}}>№</span> {rowIndex+1}</div>) 
    }

    render () {
        
        let {clients} = this.props;
        if (!clients) 
            return ( 
                <BootstrapTable headerStyle={ {backgroundColor: "#428a3ce8", color: "#fefefe" } }>
                    <TableHeaderColumn isKey dataField='id' searchable={ false } width={'60px'} dataAlign='center'>Нет данных<a href="javascript:window.location.reload(true)"><i className="fas fa-redo-alt"></i></a></TableHeaderColumn>
                </BootstrapTable>    
            ) 
        if (clients.Code)
            return ( 
                <BootstrapTable headerStyle={ {backgroundColor: "#428a3ce8", color: "#fefefe" } }>
                    <TableHeaderColumn isKey dataField='id' searchable={ false } width={'60px'} dataAlign='center'>Ошибка получения данных с сервера <a href="javascript:window.location.reload(true)"><i className="fas fa-redo-alt"></i></a></TableHeaderColumn>
                </BootstrapTable>    
            )        
        return (            
            <BootstrapTable 
                            headerStyle={ {backgroundColor: "#428a3ce8", color: "#fefefe"} }
                            data={Object.values(clients)} 
                            cellEdit={this.state.cellEditProp }
                            options={ this.state.options } 
                            striped 
                            hover         
                            exportCSV                             
                            pagination
                            search>     
                    <TableHeaderColumn dataField='id' dataFormat={this.indexRow} searchable={ false } expandable={false} editable={false} width={'60px'} dataAlign='center'>ID</TableHeaderColumn>
                    <TableHeaderColumn hidden isKey dataField='clientID' searchable={ false } editable={ false }> </TableHeaderColumn>
                    <TableHeaderColumn hidden dataField='depositID' searchable={ false } editable={ false }> </TableHeaderColumn>
                    <TableHeaderColumn dataField='clientName' editable={ false }>ФИО Клиента</TableHeaderColumn>
                    <TableHeaderColumn dataField='account' editable={ false }>№ Счета СКС</TableHeaderColumn>
                    <TableHeaderColumn dataField='orgName' editable={ false }>Наименование организации ЗП проект</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' editable={ false }>Номер телефона в Системе</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone_relevant' columnClassName="editable"  >Актуальный номер телефона</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' width={'150px'} columnClassName="d-contents pb-1" editable={ false } searchable={ false } dataFormat={this.buttonFormatter}>Утвердить карту</TableHeaderColumn>                    
                </BootstrapTable>
        )
    }
}




function mapStateToProps(state) {
    const { clients } = state;
    return {
        clients
    };
}

const connectedSalary_list = connect(mapStateToProps)(Salary_list);
export { connectedSalary_list as  Salary_list};