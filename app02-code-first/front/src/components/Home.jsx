import AddClient from './AddClient'
import AddProject from './AddProject'
import ClientTable from './ClientTable'
import ProjectList from './ProjectList'

const Home = () => {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddProject />
        <AddClient />
      </div>
      <ProjectList />
      <hr />
      <ClientTable />
    </>
  )
}
export default Home