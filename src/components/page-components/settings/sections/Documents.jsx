import { getSettingsData } from '@/api/Settings';
import React from 'react';
import { useQuery } from 'react-query';

const Documents = ({ documentsData }) => {
  const documentDetail = documentsData?.[0];

  console.log(documentDetail)
  return <div>Documents</div>;
};

export default Documents;
