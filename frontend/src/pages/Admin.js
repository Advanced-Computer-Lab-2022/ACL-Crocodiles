 import AdminForm from '../components/CreateAdminForm'
 import InstructorForm from '../components/CreateInstructorForm'
 import CorporateTraineeForm from '../components/CreateCorporateTraineeForm'
const Admin = () => {
    return(

        <div className="admin">
            <h1>Admin Page</h1>
            <AdminForm/>
            <InstructorForm/>
            <CorporateTraineeForm/>
        </div>
    )
}

export default Admin