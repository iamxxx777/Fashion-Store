import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter()

        const { userInfo } = useSelector((state) => state.loginUser)
        const token = userInfo.token

        if (!token) {
            router.replace("/login")
            return null
        }

        return <WrappedComponent {...props} />
    }
}


export default withAuth