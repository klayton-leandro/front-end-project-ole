/*eslint-disable */
import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import api from '~/services/api';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

export default function Dashboard() {

const [cpf, setCPF] = useState('');


  const [users, setUsers] = useState([]);


  async function loadUsers() {
    api.get(`users?cpf=${cpf}`).then(response => {
      // traser users do data !

      setUsers(response.data.data);
    });
  }

  useEffect(() => {
    loadUsers();
  },[]);
  
  function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    TablePaginationActions.propTypes = {
      count: PropTypes.number.isRequired,
      onChangePage: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
    };
    
  return (

    
    <Container>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <input className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" value={cpf} onChange={(e) => setCPF(e.target.value)}></input>
        <button className="btn btn-primary my-2 my-sm-0 mb-3"  onClick={loadUsers} type="button">Pesquisar</button>
      </nav>
      < br />


      <Table responsive="sm" variant="dark">
        <thead>
          <tr>
            <th>NOME</th>
            <br/>
            <br />
            <th>EMAIL</th>
            <br/>
            <br />
            <th>TELEFONE</th>
            <br/>
            <br />
            <th>CPF</th>
            <br/>
            <br/>
          </tr>
        </thead>
        <tbody>
          { users.map(user => {
            return(
              <tr key={user.id}>
                <td colSpan="2" style={{position: fixed;}}>{user.name}</td>
                <td colSpan="2" style={{position: fixed;}}>{user.email}</td>
                <td colSpan="2" style={{position: fixed;}}>{user.phone}</td>
                <td colSpan="2" style={{position: fixed;}}>{user.cpf}</td>
              
                <td>
                <Link
                  to={`/users/${user.id}/files`}
                  className="btn btn-primary"
                >
                DOCUMENTOS
                </Link>
                </td>
                <td>
                <Link
                  to={`/users/${user.id}/filesold`}
                  className="btn btn-warning"
                >
                DOCUMENTOS ANTIGOS
                </Link>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
      <TableRow>
      <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
    </Container>
  );
}
