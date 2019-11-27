/*eslint-disable */
import React,{useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import api from '~/services/api';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import { hidden } from 'ansi-colors';



export default function Dashboard() {

const [cpf, setCPF] = useState('');


  const [users, setUsers] = useState([]);


  async function loadUsers() {
    api.get(`collaborators?cpf=${cpf}`).then(response => {
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
        <button className="btn btn-primary my-2 my-sm-0 mb-3"  onClick={loadUsers}  style={{fontSize: 12}} type="button">PESQUISAR</button>
      </nav>
      < br />


      <Table responsive="sm" variant="dark">
        <thead>
          <tr>
            <th style={{fontSize: 12}}>NOME</th>
            <br/>
            <br />
            <th style={{fontSize: 12}}>EMAIL</th>
            <br/>
            <br />
            <th style={{fontSize: 12}}>TELEFONE</th>
            <br/>
            <br />
            <th style={{fontSize: 12}}>CPF</th>
            <br/>
            <br/>
          </tr>
        </thead>
        <tbody>
          { users.map(user => {
            return(
              <tr key={user.id}>
                <td colSpan="2" style={{whiteSpace: "nowrap"}}>{user.name}</td>
                <td colSpan="2" style={{whiteSpace: "nowrap"}}>{user.email}</td>
                <td colSpan="2" style={{whiteSpace: "nowrap"}}>{user.phone}</td>
                <td colSpan="2" style={{whiteSpace: "nowrap"}}>{user.cpf}</td>
              
                <td>
                <Link
                  to={`/collaborators/${user.id}/files`}
                  className="btn btn-danger"
                  style={{fontSize: 9}}
                >
                DELETAR
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
