 import AdminForm from '../components/CreateAdminForm'
 import InstructorForm from '../components/CreateInstructorForm'
 import CorporateTraineeForm from '../components/CreateCorporateTraineeForm'
 import AdminNewUserForm from '../components/AdminNewUserForm'
const Admin = () => {
    return(

        <div className="admin">
            <h1>Admin Page</h1>
            <AdminNewUserForm/>
            <AdminForm/>
            <InstructorForm/>
            <CorporateTraineeForm/>
        </div>
    )
}

export default Admin