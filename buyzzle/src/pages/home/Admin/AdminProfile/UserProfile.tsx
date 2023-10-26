import Profile from "./Components/Profile"
import Changepassword from "./Components/ChangePassword"
import PaymentAddress from "./Components/PaymentAddress"

export default function AdminProfile() {

    return (
        <div>
            <Profile />
            <PaymentAddress/>
            <Changepassword />
        </div>
    )
}

