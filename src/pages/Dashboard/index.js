/*eslint-disable */
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from './styles';
import { Link } from 'react-router-dom';



export default function Dashboard() {

const [cpf, setCPF] = useState('');


  const [users, setUsers] = useState([]);




  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <input className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" value={cpf} onChange={(e) => setCPF(e.target.value)}></input>
        <button className="btn btn-primary my-2 my-sm-0 mb-3"   type="button">Pesquisar</button>
      </nav>
      < br />


      <table className="table table-striped table-light">
        <thead>
          <tr>
            <th score="col">NOME</th>
            <th scope="col">E-MAIL</th>
            <th scope="col">TELEFONE</th>
            <th scope="col">CPF</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user => {
            return(
              <tr key={user.id}>
                <td className="table-primary">{user.name}</td>
                <td className="table-secondary">{user.email}</td>
                <td className="table-secondary">{user.phone}</td>
                <td className="table-secondary py-3 px-md-5">{user.cpf}</td>
                <td className="table-secondary">
                <Link
                  to={`/users/${user.id}/files`}
                  className="btn btn-primary"
                >
                DOCUMENTOS
                </Link>
                </td>
                <td className="table-secondary">
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
      </table>
    </Container>
  );
}
