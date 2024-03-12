import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={1}
        alternativeLabel
        orientation={isMobile ? 'vertical' : 'horizontal'} // Set orientation based on screen size
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ 
              width: isMobile ? '100px' : 'auto', // Adjust width for mobile
              padding: isMobile ? '8px' : '12px' // Adjust padding for mobile
            }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
