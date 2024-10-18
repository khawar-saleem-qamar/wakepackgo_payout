import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
ConnectAccountOnboarding,
ConnectComponentsProvider,
} from "@stripe/react-connect-js";

// ----------------------------------------------------------------------

export default function PayoutInformationView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [stripeConnectInstance, setStripeConnectInstance] = useState();

  var authState;
  var token;
  useEffect(() => {
    authState = localStorage.getItem('authState');
    if (!authState) {
      navigate('/');
    }
    authState = JSON.parse(authState);
    token = authState.token;
    
    initializeStripeConnect(token);
  }, []);


  async function fetchClientSecret(token){
    try {
    const response = await fetch("https://backend.wakepackgo.com:8080/payment/initiate_payout_setup", {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Ensure correct content type

        "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const responseBody = await response.text();
        alert('Response Body:', responseBody);
        return;
    }

    const { body: { clientSecret, publishableKey } } = await response.json();
    return { clientSecret, publishableKey };
    } catch (error) {
    alert(error);
    }
  };

  async function initializeStripeConnect(token){
      try {
      const { clientSecret, publishableKey } = await fetchClientSecret(token);
      const stripeInstance = await loadConnectAndInitialize({
          publishableKey: publishableKey,
          fetchClientSecret: () => Promise.resolve(clientSecret),
          appearance: {
          overlays: "drawer",
          variables: {
              colorPrimary: "#000000",
              colorText:"#000000"
          },
          },
      });

      setStripeConnectInstance(stripeInstance);
          console.log("stripe connected");
          console.log(stripeInstance);
      } catch (error) {
      console.error("Stripe Connect initialization failed: ", error);
      throw error; // Optional: re-throw to handle it in the component
      }
  };

  return (
    <>
    {!stripeConnectInstance && 
        <div>
          Loading Please wait...
        </div>
    }
    {stripeConnectInstance && 
    <div className="stripe-payout" style={{display: 'flex', alignItems: "center", flexDirection: 'column'}}>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding />
      </ConnectComponentsProvider>


      <div className="info-callout">
        <p>
          This is a sample app for Connect onboarding using the Account Onboarding embedded component. 
          <a href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=embedded" target="_blank" rel="noopener noreferrer">View docs</a>
        </p>
      </div>
    </div>
    }
  </>
)
}