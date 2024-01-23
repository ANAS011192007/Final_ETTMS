import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QR_Reader = (props) => {
  const [data, setData] = useState('No result');

  const handleScan = (result, error) => {
    if (!!result) {
      setData(result.text);
      console.log(result.text);
      console.log(typeof result)
    }

    if (!!error) {
      console.info(error);
      console.log(typeof error)
    }
  };

  return (
    <>
      <QrReader

        onResult={handleScan}
        style={{ width: '100%' }}
      />
{data}
    </>

  );
};

export default QR_Reader;
