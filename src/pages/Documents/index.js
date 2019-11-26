/*eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '~/services/api';
import { Container } from './styles';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ModalImage from 'react-modal-image';

export default function Documents({ match }) {

  const profile = useSelector(state => state.user.profile);

  const id = useMemo(file => match.params.id, [match.params.id]);

  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);

  const [form, setForm] = useState(false);
  const handleChangeForm = id => {
    setDocumentSelected(id)
    setForm(!form);

  }

  const [message, setMessage] = useState([]);

  const [documentSelected, setDocumentSelected] = useState(null);

  const [files, setFiles] = useState([]);


  const handleChangeDocument = id => {
    setDocumentSelected(id);
    setShow(true);
  };



  async function loadDocuments() {
    api.get(`users/${id}/files/`).then(response => {

      setFiles(response.data);
    });
  }

  useEffect(() => {
    loadDocuments();
  }, []);


  async function handleChangeStatusDocument(status) {
    await api
      .put(`/files/${documentSelected}/status`, {
        checked: status,
      })
      .then(response => {
        loadDocuments();
        if (status) {
          toast.success('Atualizado com sucesso');
          closeModal();
        } else {
          toast.error('Rejeitado com sucesso');
          closeModal();
        }
      })
      .catch(err => {});
  }

  async function messageSubmit(e) {
    e.preventDefault()
    // trasendo o id do file por função e retornar no parametros
    // console.log(documentSelected)
    await api
      .put(`/files/${documentSelected}`, {
        message,
      })
      .then(response => {
          toast.info('Mensagem Enviado !');
          loadDocuments();
          setMessage('')
          setForm(false)

      })
      .catch(err => {});
  }

  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light">
          <Link  to="/dashboard" className="breadcrumb-item tex-dark btn btn-primary">CLIENTES</Link>
          <li className="breadcrumb-item active text-dark btn">DOCUMENTOS</li>

        </ol>
      </nav>

      <table className="table table-light table-bordered">
        <thead>
          <tr>
            <th scope="col">STATUS</th>

            <th scope="col-md-16">DESCRIÇÃO</th>
            <th scope="col">MENSAGEM</th>
            <th scope="col">AÇÕES</th>

          </tr>
        </thead>

        <tbody className="dark">
          {files.map(file => {
            return (
              <tr key={file.id}>
                <td>
                  {file.file === null &&
                    <div className="badge badge-primary">NÃO ENVIADO</div>
                  }
                  {file.file  && file.checked === null &&
                    <div className="badge badge-warning">ESPERANDO ANALISE</div>
                  }
                  {file.file  && file.checked === true &&
                    <div className="badge badge-success">APROVADO</div>
                  }
                  {file.file  && file.checked === false &&
                    <div className="badge badge-danger">REPROVADO</div>
                  }
                  </td>
                <td className="text-dark md-lg" style={{whiteSpace: "nowrap"}} >{file.description}</td>
                <td className="text-dark" style={{whiteSpace: "nowrap"}} >{file.message}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-taggle="modal"
                    data-targe="modalfiles"
                    onClick={() => handleChangeDocument(file.id)}
                  >
                    VISUALIZAR
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-taggle="modal"
                    onClick={() =>handleChangeForm(file.id)}
                  >
                    MENSAGENS
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {documentSelected && (
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Documentos</Modal.Title>
          </Modal.Header>
          <ModalImage
            smallSrcSet={`https://api-serversind.com/files/${documentSelected}`}
            medium={`https://api-serversind.com/files/${documentSelected}`}
            hideDownload={true}
          ></ModalImage>
         

          <Modal.Footer>

            {
              profile.admin === true && ( 
              <>
                <div>
                <Button onClick={() => handleChangeStatusDocument(false)} variant="danger" >
                  REPROVAR
                </Button>
                </div>
                <div>
                <Button onClick={() => handleChangeStatusDocument(true)} variant="success">
                  APROVAR
                </Button>
                </div>
              </>
              )
            }

          </Modal.Footer>
        </Modal>
      )}
      <Modal show={form} onHide={() => setForm(!form)}>
        <Modal.Header closeButton>
          <Modal.Title>ENVIAR MENSAGENS</Modal.Title>
        </Modal.Header>
          <form onSubmit={messageSubmit}>
        <Modal.Body>
            <div className="form-group"></div>
            <div className="form-group">
              <label  className="col-form-label">
                MENSAGEM:
              </label>
              <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">ENVIAR</Button>
        </Modal.Footer>
          </form>
      </Modal>
  </Container>
);
}
