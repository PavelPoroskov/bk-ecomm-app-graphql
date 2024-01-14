import { FaTrash } from 'react-icons/fa';

import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from './mutations';
import { GET_CLIENTS, GET_PROJECTS } from './queries';

const ClientTableRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [
      { query: GET_CLIENTS },
      { query: GET_PROJECTS },
    ],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

ClientTableRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default ClientTableRow