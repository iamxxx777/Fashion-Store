import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Paginate = ({ pages, pageNumber, click }) => {
    const [page, setPage] = useState(pageNumber || 1)
    
    const handleChange = (event, value) => {
        setPage(value)
        click(value)
    }

    return (
        <Stack spacing={2}>
            <Pagination onChange={handleChange} count={pages} page={page} color="primary" variant="outlined" shape="rounded" />
        </Stack>
    )
};

export default Paginate;