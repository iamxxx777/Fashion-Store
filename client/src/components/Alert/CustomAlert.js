import Alert from '@mui/material/Alert'

import styles from "../../styles/Alert.module.scss"

const CustomAlert = ({ severity, msg }) => {
    return (
        <div className={styles.alert}>
            <Alert severity={severity} sx={{ width: '100%', mb: 3 }}>
                {msg}
            </Alert>
        </div>
    )
}

export default CustomAlert