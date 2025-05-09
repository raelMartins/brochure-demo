import {useState} from 'react';
import {
  Flex,
  HStack,
  Text,
  useToast,
  FormControl,
  Spinner,
  Textarea,
  Stack,
  useTheme,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {themeStyles} from '@/theme';
import {scrollBarStyles} from './deposit';
import {CloseIcon} from '@chakra-ui/icons';
import {IoIosArrowBack} from 'react-icons/io';
import {store_name} from '@/constants/routes';
import {useMutation, useQuery} from 'react-query';
import {Select} from '@/realtors_portal/components';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {FormInput} from '@/ui-lib/ui-lib.components/Input';
import {fetchSupportedBanks, walletWithdrawal} from '@/api/Wallet';
import {drawer_title_styles} from '../styles';

const formSchema = Yup.object().shape({
  account_number: Yup.string()
    .matches(/^\d+$/, 'Account number must contain only digits')
    .length(10, 'Account number should be exactly 10 digits')
    .required('Please enter your account number'),
  amount: Yup.string().required('Please enter an amount'),
  bank_code: Yup.string().required('Please select a bank'),
});

export const WithdrawalWallet = ({setPage, onWalClose}) => {
  const toast = useToast();
  const [bankName, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const LIST_ALL_BANKS = useQuery(['fetchSupportedBanks'], fetchSupportedBanks);

  const SUPPORTED_OFFICIAL_BANKS = LIST_ALL_BANKS?.data?.data?.message?.length
    ? LIST_ALL_BANKS?.data?.data?.message
    : [];

  const mutation = useMutation(formData => walletWithdrawal(formData), {
    onSuccess: res => {
      onWalClose();
      toast({
        description: `Withdrawal successful`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toast({
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });
  const storeName = store_name();

  const formik = useFormik({
    initialValues: {
      store_name: storeName,
      account_number: '',
      amount: '',
      description: '',
      bank_code: '',
    },
    validationSchema: formSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: values => {
      let withdrawalPayload = {
        ...values,
        account_number: `${values.account_number}`,
        amount: Number(values.amount.replace(',', '')),
      };
      mutation.mutate(withdrawalPayload);
    },
  });

  const handleSelectBank = e => {
    const bank_ = SUPPORTED_OFFICIAL_BANKS?.find(bank => bank?.code === e.target.value);
    if (bank_) {
      setBank(bank_?.name);
      formik.setFieldValue('bank_code', bank_?.code);
    }
  };
  const handleInput = e => {
    const formatNumber = parseInt(e.target?.value?.replace(/,/g, ''))?.toLocaleString();
    setAmountError('');
    if (formatNumber !== 'NaN') {
      setAmount(formatNumber);
      formik.setFieldValue('amount', formatNumber);
    } else {
      setAmount('');
    }
  };
  return (
    <Stack>
      <Flex {...drawer_title_styles} bg="matador_background.100">
        <HStack onClick={() => setPage('wallet')} cursor="pointer">
          <IoIosArrowBack fontSize={'22px'} cursor="pointer" color="text" />
          <Text>Withdrawal</Text>
        </HStack>
        <CloseIcon
          display={{base: 'none', md: 'flex'}}
          fontSize={'15px'}
          cursor="pointer"
          color="text"
          onClick={onWalClose}
        />
      </Flex>

      <form onSubmit={formik.handleSubmit}>
        <Flex
          h="full"
          bg="matador_background.200"
          position="relative"
          css={scrollBarStyles}
          px={{base: '15px', lg: '24px'}}
          py={{base: '10px', lg: '20px'}}
          gap="8px"
          direction="column"
          align={'start'}
          my={{base: '18px', md: '28px'}}
        >
          <FormControl>
            <FormInput
              leftAddon={
                <Text marginTop={{base: '.7rem', md: '1.3rem'}} color="text" fontSize={'20px'}>
                  ₦
                </Text>
              }
              label="Amount to deposit"
              onChange={handleInput}
              value={amount}
              error={amountError}
              h={{base: '48px', md: '60px'}}
              rounded="24px"
              labelStyle={{
                textTransform: 'uppercase',
                color: 'text.3',
                letterSpacing: '.14px',
                fontWeight: '500',
              }}
              border="1px solid"
              borderColor={`matador_border_color.100`}
              _focus={{
                boxShadow: 'transparent',
                outline: 'none',
                borderColor: `matador_border_color.100`,
              }}
              _active={{
                boxShadow: 'transparent',
                outline: 'none',
                borderColor: `matador_border_color.100`,
              }}
              _focusVisible={{
                boxShadow: 'transparent',
                outline: 'none',
              }}
              focusBorderColor="transparent"
              placeholder="0.00"
              bg="transparent"
              _hover={{borderColor: `custom_color.color_pop`}}
            />
            <Stack>
              <Text
                className="Poppins"
                color="text"
                mt={'15px'}
                fontSize={14}
                fontWeight={400}
                textTransform="uppercase"
              >{`Select Bank`}</Text>
              <Select
                w="full"
                cursor="pointer"
                h={{base: '48px', md: '60px'}}
                fontSize="14px"
                fontWeight="400"
                border="1px solid"
                borderColor={`matador_border_color.100`}
                _focus={{
                  borderColor: `matador_border_color.100`,
                }}
                _active={{
                  borderColor: `matador_border_color.100`,
                }}
                borderRadius="24px"
                _placeholder={{
                  color: '#737373',
                  fontWeight: '300',
                }}
                placeholder={bankName || 'Select Bank Name'}
                color="text"
                value={bankName}
                onChange={handleSelectBank}
                onBlur={formik.handleBlur('bank_code')}
                bg="transparent"
                _hover={{borderColor: `custom_color.color_pop`}}
              >
                {SUPPORTED_OFFICIAL_BANKS?.length ? (
                  SUPPORTED_OFFICIAL_BANKS.map((bank, index) => (
                    <option key={index} value={bank?.code} style={{color: `#000`}}>
                      {bank?.name}
                    </option>
                  ))
                ) : (
                  <option value={''}>Fetching supported banks...</option>
                )}
              </Select>
              <Text color={themeStyles.color.matador__red} my={'5px'} fontSize={'11px'}>
                {formik.touched.bank_code && formik.errors.bank_code}
              </Text>
            </Stack>
            <Text
              className="Poppins"
              mt={'10px'}
              mb={'6px'}
              color="text"
              fontSize={14}
              fontWeight={400}
              textTransform="uppercase"
            >{`Account Number`}</Text>
            <FormInput
              color="text"
              error={formik.touched.account_number && formik.errors.account_number}
              onChange={formik.handleChange('account_number')}
              value={formik.values.account_number}
              onBlur={formik.handleBlur('account_number')}
              h={{base: '48px', md: '60px'}}
              placeholder="Enter account number"
              errorSize="11px"
              border="1px solid"
              borderColor={`matador_border_color.100`}
              _focus={{
                borderColor: `matador_border_color.100`,
              }}
              _active={{
                borderColor: `matador_border_color.100`,
              }}
              borderRadius="24px"
              bg="transparent"
              _hover={{borderColor: `custom_color.color_pop`}}
            />
          </FormControl>
          <Text
            className="Poppins"
            mt={'14px'}
            textAlign={'center'}
            color="text"
            fontSize={14}
            fontWeight={400}
            textTransform="uppercase"
          >{`Description`}</Text>
          <Textarea
            color="text"
            type="text"
            h={{base: '48px', md: '60px'}}
            border="1px solid"
            borderColor={`matador_border_color.100`}
            _focus={{
              borderColor: `matador_border_color.100`,
            }}
            _active={{
              borderColor: `matador_border_color.100`,
            }}
            borderRadius="24px"
            placeholder="Optional"
            onChange={formik.handleChange('description')}
            value={formik.values.description}
            resize="none"
            p="13.333px 18.667px"
            _hover={{borderColor: `custom_color.color_pop`}}
          />
        </Flex>
        <Button
          variation={`primary`}
          bottom="7.5%"
          type="submit"
          position="absolute"
          borderRadius="24px"
          w={{base: '95vw', md: '350px'}}
          left={{base: '.7rem', md: '1.5rem'}}
          isDisabled={mutation?.isLoading || !formik.isValid}
          isLoading={mutation?.isLoading}
        >
          Proceed
        </Button>
      </form>
    </Stack>
  );
};

export default WithdrawalWallet;
