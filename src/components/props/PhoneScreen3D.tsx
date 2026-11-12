import React from 'react';
import { CrabitSmartphone3D, CrabitSmartphone3DProps } from './CrabitSmartphone3D';

export type PhoneScreen3DProps = CrabitSmartphone3DProps;

export const PhoneScreen3D: React.FC<PhoneScreen3DProps> = (props) => {
  return <CrabitSmartphone3D {...props} />;
};

export default PhoneScreen3D;
