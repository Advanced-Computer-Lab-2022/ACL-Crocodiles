import { Grid, Stack } from "@mui/material"
import AdminPromoAll from "../components/AdminPromoAll"
import AdminPromoCourse from "../components/AdminPromoCourse"
import AdminPromoSome from "../components/AdminPromoSome"

const AdminPromo = () => {

    return(
        <Stack direction="column" spacing={2}>
        <AdminPromoAll/>
        <AdminPromoSome/>
        </Stack>
    )
}
export default AdminPromo