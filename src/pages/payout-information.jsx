import { Helmet } from 'react-helmet-async';

import { PayoutInformationView } from 'src/sections/payout_information';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Payout Information | WakePackGo </title>
      </Helmet>

      <PayoutInformationView />
    </>
  );
}
