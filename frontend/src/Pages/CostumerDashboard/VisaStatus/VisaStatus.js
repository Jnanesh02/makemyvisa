import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ApplicationForm from './ApplicationForm';
import Form2 from './Form2';
import Form3 from './Form3';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: 1,
    2: 2,
    3:3 ,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Registration and Onboarding', 'Document Upload', 'Document downloading complete',
 'Document Verification','Additional Document Required','Document Under Processing','Document Verification And Approval',
 'Payment Due','payment Cleared','File Delivery'
];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed

  const ApplicationStatus = "submitted";
  React.useEffect(
    () => {
      switch (ApplicationStatus) {
        case "completed":
          setActiveStep(2);
          break;
        case "assigned":
          setActiveStep(1);
          break;
        case "submitted":
          setActiveStep(0);
          break;
        default:
          break;
      }
    },
    [ApplicationStatus]
  );

  const [data,setData]=React.useState({
    onboarding:[
      {
        FirstName:"Praveen",
        LastName:"sagar",
        pay:'200/-'
      }
    ]
  })
  return (
    <Stack sx={{ width: isMobile?'':'100%',display:isMobile?'flex':'',flexDirection:isMobile?'row':'', }} spacing={4} className='mt-3'>
      <Stepper alternativeLabel orientation={isMobile ? 'vertical' : 'horizontal'} // Set orientation based on screen size
       activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ 
              width: isMobile ? '70px' : '100px', // Adjust width for mobile
              padding: isMobile ? '8px' : '' // Adjust padding for mobile
            }}
            icon={index + 1}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{margin:'1rem'}}>
        {activeStep === 0 && <ApplicationForm Data={data.onboarding}/>}
        {activeStep === 1 && <Form2 />}
        {activeStep === 2 && <Form3 />}
      </div>
    </Stack>
  );
}
