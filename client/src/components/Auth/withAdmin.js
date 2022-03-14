import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const withAdmin = (WrappedComponent) => {
    return (props) => {
        const router = useRouter()

        const { userInfo } = useSelector((state) => state.loginUser)
        const token = userInfo.token
        const isAdmin = userInfo.isAdmin

        if (!token && !isAdmin) {
            router.replace("/login")
            return null
        }

        return <WrappedComponent {...props} />
    }
}


export default withAdmin