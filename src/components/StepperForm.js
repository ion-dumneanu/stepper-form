import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const steps = [
  {
    title: 'SIGNUP INFO',
    elements: [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'confirm_password', label: 'Confirm password', type: 'password' }
    ]
  },
  {
    title: 'PERSONAL INFO',
    elements: [
      { name: 'username', label: 'User Name', type: 'text' },
      { name: 'firstname', label: 'First Name', type: 'text' },
      { name: 'lastname', label: 'Last Name', type: 'text' }
    ]
  },
  {
    title: 'PROFESSIONAL INFO',
    elements: [
      { name: 'currentCompany', label: 'Current Company', type: 'text' },
      { name: 'totalExperience', label: 'Total Experience', type: 'number' },
      { name: 'designation', label: 'Designation', type: 'text' }
    ]
  }
];

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepPayload, setStepPayload] = React.useState([]);

  const handleInputChange = event => {
    const newStepPayload = [...stepPayload];
    newStepPayload[activeStep] = { ...newStepPayload[activeStep], [event.target.name]: event.target.value };
    setStepPayload(newStepPayload);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      console.log(JSON.stringify(stepPayload));
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const dynamicItemRender = ({ name, label, type }, value, handleInputChange) =>
    <TextField key={name + type} name={name} type={type} placeholder={label} value={value} onChange={handleInputChange} />

  return (
    <Box sx={{ width: '35%' }}>
      {activeStep === steps.length ? (
        <Stack direction="row" alignItems="center" gap={1}>
          <CheckCircleIcon color='primary' />
          <Typography sx={{ mt: 2, mb: 1 }}>
            You have succesfully completed the process.
          </Typography>
        </Stack>
      ) : (
        <React.Fragment>
          <Stepper activeStep={activeStep}>
            {steps.map((item, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}></StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].title} </Typography>

          <Box
            component="form"
            // sx={{ display: 'flex', flexDirection: 'column' }}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '35ch' },
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>

            {
              steps[activeStep].elements.map(structure => dynamicItemRender(structure, stepPayload.at(activeStep) ? stepPayload[activeStep][structure.name] : null, handleInputChange))
            }

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 20 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button type="submit"
                variant="contained">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>

          </Box>

        </React.Fragment>
      )}
    </Box>
  );
}