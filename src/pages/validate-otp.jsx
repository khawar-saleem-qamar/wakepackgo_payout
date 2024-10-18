import { Helmet } from 'react-helmet-async';

import { ValidateOtpView } from 'src/sections/validate-otp';

// ----------------------------------------------------------------------

export default function ValidateOtpPage() {
  return (
    <>
      <Helmet>
        <title> Validate Otp | WakePackGo </title>
      </Helmet>

      <ValidateOtpView />
    </>
  );
}
