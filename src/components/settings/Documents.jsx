import {Box, useToast} from '@chakra-ui/react';
import {UploadUserDocuments} from './UploadUserDocuments';
import {useMutation, useQuery} from 'react-query';
import {getSettingsData, postDoc} from '@/api/Settings';

export const Documents = ({type = '', profile_query}) => {
  const toast = useToast();

  const documentDetail =
    type === 'utility_bill'
      ? {
          document: profile_query?.data?.data?.data?.utility_bill,
          created_at: profile_query?.data?.data?.data?.utility_bill_updated_at,
        }
      : profile_query?.data?.data?.data?.documents?.[0];

  const toDateFormat = dateString => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const {mutate, isLoading} = useMutation(postDoc, {
    onSuccess: res => {
      profile_query.refetch();
    },
    onError: err => {
      return toast({
        description: `${err?.response?.data?.message || 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleDocument = data => {
    // type === `utility_bill`

    const obj =
      type === `utility_bill`
        ? {
            utility_bill: data.map(item => item.replace('data:', '')?.replace(/^.+,/, ''))?.[0],
            profile_details: true,
          }
        : {
            document_update: true,
            document: data.map(item => item.replace('data:', '').replace(/^.+,/, '')),
            profile_details: true, // document_type: "International Passport",
            // id_number: "3456789",
            // exp_date: "4567",
          };
    mutate(obj);
  };

  return (
    <UploadUserDocuments
      noNeedForType
      displayText={
        profile_query?.isLoading
          ? 'Loading...'
          : isLoading
          ? 'Uploading...'
          : documentDetail?.document
          ? `Uploaded: ${toDateFormat(documentDetail?.created_at)}`
          : 'Choose file to upload'
      }
      loading={profile_query?.isLoading}
      uploading={isLoading}
      doc={documentDetail}
      isDisabled={
        // (documentDetail?.document && documentDetail?.created_at) ||
        isLoading || profile_query?.isLoading
      }
      type={type}
      handleDocument={handleDocument}
    />
  );
};
export default Documents;
