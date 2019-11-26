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

export default function DocumentsOld({ match }) {

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
    api.get(`users/${id}/oldFiles`).then(response => {

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


  return (
    <Container>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light">
          <Link  to="/dashboard" className="breadcrumb-item tex-dark btn btn-primary">DASHBOARD</Link>
          <li className="breadcrumb-item active text-dark btn">DOCUMENTOS ANTIGOS</li>

        </ol>
      </nav>

      <table className="table table-light table-bordered">
        <thead>
          <tr>
          

            <th scope="col-md-16">DESCRIÇÃO</th>
         
            <th scope="col">AÇÕES</th>

          </tr>
        </thead>

        <tbody className="dark">
          {files.map(file => {
            return (
              <tr key={file.id}>
               
                <td className="text-dark md-lg">{file.description}</td>
               
                <td>
                  <button
                    className="btn btn-primary"
                    data-taggle="modal"
                    data-targe="modalfiles"
                    onClick={() => handleChangeDocument(file.id)}
                  >
                    {documentSelected}
                    VISUALIZAR
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
          <span class="badge badge-primary">DOCUMENTO</span>
          <ModalImage
            smallSrcSet={`https://api-serversind.com/filesOld/${documentSelected}`}
            medium={`https://api-serversind.com/filesOld/${documentSelected}`}
          ></ModalImage>
          <Modal.Footer>

          

          </Modal.Footer>
        </Modal>
      )}
     
  </Container>
);
}



















