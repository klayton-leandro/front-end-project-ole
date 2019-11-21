import React, { useEffect, useState, useMemo } from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '~/services/api';
import { Container } from './styles';
import { toast } from 'react-toastify';


import Modal from 'react-bootstrap/Modal';

import ModalImage from 'react-modal-image';

export default function DocumentsOld({ match }) {

  const profile = useSelector(state => state.user.profile);
  console.log(profile);

  const id = useMemo(file => match.params.id, [match.params.id]);

  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
//eslint-disable-next-line
  const [form, setForm] = useState(false);
  const handleChangeForm = id => {
    setDocumentSelected(id)
    setForm(!form);

  }

  // eslint-disable-next-line

  const [documentSelected, setDocumentSelected] = useState(null);

  const [files, setFiles] = useState([]);

//eslint-disable-next-line
  const handleChangeDocument = id => {
    setDocumentSelected(id);
    setShow(true);
  };


//eslint-disable-next-line
  async function loadDocuments() {
    api.get(`users/${id}/oldFiles`).then(response => {
console.log(response.data)
      setFiles(response.data);
    });
  }

  useEffect(() => {
    loadDocuments();
  }, []);

// eslint-disable-next-line
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
          <li className="breadcrumb-item active text-dark btn">DOCUMENTOS Antigos</li>

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
            smallSrcSet={`http://167.172.228.229:3333/filesOld/${documentSelected}`}
            medium={`http://167.172.228.229:3333/filesOld/${documentSelected}`}
          ></ModalImage>
          <Modal.Footer>

          

          </Modal.Footer>
        </Modal>
      )}
     
  </Container>
);
}



















