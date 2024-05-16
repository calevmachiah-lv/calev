import React from 'react';
import { useSelector } from 'react-redux';
import { Title } from './formTitle.styles';
import { getProductName } from '../../store/threekitSlicer';

function FormTitle() {
  const productName = useSelector(getProductName);

  return <Title>{productName}</Title>;
}

export default FormTitle;
