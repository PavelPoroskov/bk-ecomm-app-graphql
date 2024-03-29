import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DELETE_PROJECT } from '../api/mutations';
import { GET_PROJECTS } from '../api/queries';

const DeleteProject = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2'
        onClick={deleteProject}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}

DeleteProject.propTypes = {
  projectId: PropTypes.string,
};


export default DeleteProject