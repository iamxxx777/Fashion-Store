import { Fragment } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

const steps = [<Typography>1. Shipping</Typography>, <Typography>2. Review Order</Typography>, <Typography>3. Payment</Typography>]

const CheckoutSteps = ({ activeStep }) => {
    return (
        <Fragment>
            <Stepper>
                {steps.map((label, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                            }}
                        >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps


