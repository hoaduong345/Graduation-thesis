import Profile from "../UserProfile/Components/Profile"
import Changepassword from "../UserProfile/Components/ChangePassword"
import PaymentAddress from "../UserProfile/Components/PaymentAddress"

export default function UserProfile() {

    return (
        <div>
            <Profile />
            <PaymentAddress/>
            <Changepassword />
        </div>
    )
}

