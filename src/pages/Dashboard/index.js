/*eslint-disable */
import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import api from '~/services/api';
import { Container } from './styles';
import { Link } from 'react-router-dom';



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
                <td colSpan="2" style={{flex: 1, flexWrap: 'wrap'}}>{user.name}</td>
                <td colSpan="2" style={{flex: 1, flexWrap: 'wrap'}}>{user.email}</td>
                <td colSpan="2" style={{flex: 1, flexWrap: 'wrap'}}>{user.phone}</td>
                <td colSpan="2" style={{flex: 1, flexWrap: 'wrap'}}>{user.cpf}</td>
              
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
    </Container>
  );
}
