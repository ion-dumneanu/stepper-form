import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';



const steps = [
  {
    title:'SIGNUP INFO',
    elements: [
      {name:'email', label: 'Email', type:'email'},
      {name:'password', label: 'Password', type:'password'},
      {name:'confirm_password', label: 'Confirm password', type:'password'} 
    ],
    payload:{email:'bob@ddd.cc',password:'bob',confirm_password:'bob'}
   },
   {
    title:'PERSONAL INFO',
    elements: [
      {name:'username', label: 'User Name', type:'text'},
      {name:'firstname', label: 'First Name', type:'text'},
      {name:'lastname', label: 'Last Name', type:'text'} 
    ],
    payload: {username:'123', firstname:'firstname', lastname:'lastname'}
   },
   {
    title:'PROFESSIONAL INFO',
    elements: [
      {name:'currentCompany', label: 'Current Company', type:'text'},
      {name:'totalExperience', label: 'Total Experience', type:'number'},
      {name:'designation', label: 'Designation', type:'text'} 
    ],
    payload:{currentCompany:'Signant Health',totalExperience: 5, designation:'Manager'}  
   }
];

export default function WizzardForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  
  const [stepPayload, setStepPayload] = React.useState([
    // {email:'bob@ddd.cc',password:'bob',confirm_password:'bob'},
    // {username:'123', firstname:'firstname', lastname:'lastname'},
    // {currentCompany:'Signant Health',totalExperience: 5, designation:'Manager'}  
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleInputChange = event => {    
    console.log(event)
    const newStepPayload = [...stepPayload];
    newStepPayload[activeStep]= {...newStepPayload[activeStep], [event.target.name]: event.target.value};
    console.log(newStepPayload)
    setStepPayload(newStepPayload);
  }

  const dynamicItemRender = ({name, label, type}, value, handleInputChange)=>    
   (<Input key={name+type} type={type} name={name} placeholder={label} value={value} onChange={handleInputChange} />)

  const handleSubmit = event => {
    event.preventDefault(); 
    handleNext();
  };

  return (
    <Box sx={{ width: '50%' }}>
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
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].title} </Typography>
         
          <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                validate
                autoComplete="off"
                onSubmit={handleSubmit}>

               {
                steps[activeStep].elements.map(structure => dynamicItemRender(structure, stepPayload.at(activeStep)?stepPayload[activeStep][structure.name]:null , handleInputChange))
               }   

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button type="submit" >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>

          </Box>

        </React.Fragment>
      )}
    </Box>
  );
}