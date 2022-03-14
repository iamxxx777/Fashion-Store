import React from 'react'
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#D23f57',
        color: 'rgb(255, 255, 255)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#D23f57',
        color: 'rgb(255, 255, 255)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      minWidth: 25,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#FCE9EC',
      borderRadius: 3,
    },
}));

const activeStyle = {
    backgroundColor: '#D23f57',
    color: '#fff',
}

const inActiveStyle = {
    backgroundColor: '#f3cad0',
    color: '#D23f57',
}

const mainStyle = {
  maxWidth: '1250px',
  margin: '0 auto'
}


const steps = ['1. Shipping', '2. Review Order', '3. Payment']


const CustomizedSteps = ({ activeStep }) => {
  return (
    <div className='steps' style={mainStyle}>
        <Stepper sx={{flexWrap: 'wrap'}} activeStep={1} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
                <Step 
                    sx={{
                        padding: '0',
                        marginBottom: '0.5rem',
                    }}
                    key={index}
                    active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                >
                    <StepLabel
                        sx={
                            {
                                padding: '0.4rem 1rem',
                                borderRadius: '25px',
                                '& .MuiStepLabel-iconContainer': {
                                    display: 'none',
                                },
                                '& .MuiStepLabel-labelContainer': {
                                    color: '#D23f57',
                                    fontSize: '16px',
                                },
                                '& .MuiStepLabel-label .Mui-completed': {
                                  color: 'rgb(255,255,255)',
                                },
                                '& .Mui-active': {
                                    color: 'rgb(255,255,255)',
                                },
                                '& .Mui-completed': {
                                    color: 'rgb(255,255,255)',
                                },
                                
                            }
                        }
                        style={activeStep >= index ? activeStyle : inActiveStyle}
                    >{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  )
}

export default CustomizedSteps