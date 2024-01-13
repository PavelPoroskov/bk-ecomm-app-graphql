import { useQuery } from '@apollo/client';
import ClientTableRow from './ClientTableRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from './queries';

const ClientTable = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;

  if (error) return <p>Something Went Wrong</p>;

  return (
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map((client) =>
          <ClientTableRow key={client.id}
            client={client} />)}
      </tbody>
    </table>
  );
}

export default ClientTable;