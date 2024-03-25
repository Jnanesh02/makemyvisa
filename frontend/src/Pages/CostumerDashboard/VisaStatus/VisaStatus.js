import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ApplicationForm from "./ApplicationForm";
import { DocumentUpload } from "./DocumentUpload";
import { AdditionalDocumentUpload } from "./AdditionalDocumentUpload";
import CookieUtils from "../../../components/Cookie/Cookies";
import { DocumentDownloading } from "./DocumentDownloading";
import { DocumentVerification } from "./DocumentVerification";
import { DocumentUnderProcessing } from "./DocumentUnderProcessing";
import { DocumentApproved } from "./DocumentApproved";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,39) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,56) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { completed, className, applicationStatus } = props;

  // Determine if the step should be active
  const isActive = applicationStatus === "completed" || props.active;

  // Define the icons object
  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active: isActive }}
      className={className}
    >
      {completed ? <Check /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
  extraField: PropTypes.bool,
};

const steps = [
  "Registration and Onboarding",
  "Document Upload",
  "Document downloading complete",
  "Document Verification",
  "Additional Document Required",
  "Document Under Processing",
  "Document Verification And Approval",
  "Payment Due",
  "payment Cleared",
  "File Delivery",
];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [appicationData, setAppicationData] = useState([]);
  const [visaApplicationId, setVisaApplicationId] = useState("");
  const [loading, setLoading] = useState(false);

  const { visastatuses } = useParams();
  const customerId = CookieUtils.getCookies("userId");
  const objectID = JSON.parse(atob(customerId.split(".")[1]));
  const customerID = objectID.id;
  const handleStepClick = (step) => {
    if (step <= completeStep) {
      setActiveStep(step);
    }
  };
  useEffect(() => {
    const fetchSelectedServiceTicket = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getservice/${visastatuses}`,
          { params: { customerID } }
        );
        setApplicationStatus(
          response.data.map((response) => response.data.formData.status)
        );
        setVisaApplicationId(response.data.map((response) => response._id));
        setAppicationData(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSelectedServiceTicket();
  }, [customerID, visastatuses, loading]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  React.useEffect(() => {
    switch (applicationStatus[0]) {
      case "payment":
        setActiveStep(7);
        setCompleteStep(7);
        break;
      case "approved":
        setActiveStep(6);
        setCompleteStep(6);
        break;
      case "underprocess":
        setActiveStep(5);
        setCompleteStep(5);
        break;
      case "additional":
        setActiveStep(4);
        setCompleteStep(4);
        break;
      case "downloaded":
        setActiveStep(3);
        setCompleteStep(3);
        break;
      case "verification":
        setActiveStep(2);
        setCompleteStep(2);
        break;
      case "submit":
        setActiveStep(1);
        setCompleteStep(1);
        break;
      case "":
        setActiveStep(0);
        setCompleteStep(0);
        break;
      default:
        break;
    }
  }, [applicationStatus]);
  console.log("appicationData",appicationData);
  return (
    <Stack
      sx={{
        width: isMobile ? "" : "100%",
        display: isMobile ? "flex" : "",
        flexDirection: isMobile ? "row" : "",
      }}
      spacing={4}
      className="mt-3"
    >
      <Stepper
        alternativeLabel
        orientation={isMobile ? "vertical" : "horizontal"} // Set orientation based on screen size
        activeStep={completeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{
                width: isMobile ? "70px" : "100px", // Adjust width for mobile
                padding: isMobile ? "8px" : "", // Adjust padding for mobile
              }}
              icon={index + 1}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ margin: "1rem" }}>
        {activeStep === 0 && (
          <ApplicationForm Data={appicationData} setLoading={setLoading} />
        )}
        {activeStep === 1 && appicationData.length > 0 && (
          <DocumentUpload
            Data={appicationData}
            visaId={visaApplicationId[0]}
            setLoading={setLoading}
          />
        )}
        {activeStep === 2 && <DocumentDownloading Data={appicationData} />}
        {activeStep === 3 && <DocumentVerification Data={appicationData} />}
        {activeStep === 4 && appicationData.length > 0 && (
          <AdditionalDocumentUpload
            Data={appicationData}
            visaId={visaApplicationId[0]}
            setLoading={setLoading}
          />
        )}
        {activeStep === 5 && <DocumentApproved Data={appicationData} />}
        {activeStep === 6 && <DocumentUnderProcessing Data={appicationData} />}

      </div>
    </Stack>
  );
}
