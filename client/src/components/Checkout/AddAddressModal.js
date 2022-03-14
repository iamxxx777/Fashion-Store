import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

const AddAddressModal = () => {
    return (
        <section className="add_address_modal">
            <div className="container">
                <div className="title">
                    <button>X</button>
                    <h1>Add New Address</h1>
                </div>
                <div className="form">
                    {error && <small style={{ color: "tomato", marginBottom: "2rem" }}>{error}</small>}
                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="First Name" 
                                    variant="standard" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="Last Name" 
                                    variant="standard" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="Phone" 
                                    variant="standard" 
                                    value={phone}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="Phone 2" 
                                    variant="standard" 
                                    value={phone2}
                                    onChange={(e) => setPhone2(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth 
                                    label="Address" 
                                    variant="standard" 
                                    value={street}
                                    required
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth 
                                    label="Nearest landmark" 
                                    variant="standard" 
                                    required
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="State" 
                                    variant="standard" 
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth 
                                    label="City" 
                                    variant="standard" 
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel 
                                    sx={
                                            {
                                                width: '100%',
                                            }
                                        }
                                        control={
                                            <Checkbox 
                                                checked={main}
                                                onChange={(e) => setMain(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }} 
                                            />
                                        } 
                                        label="Set as default" 
                                />
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 2, '& button': { width: "100%" } }} >
                            <Grid item xs={12}>
                            <LoadingButton
                                endIcon={<SaveIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </LoadingButton>
                            </Grid>    
                        </Grid>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddAddressModal