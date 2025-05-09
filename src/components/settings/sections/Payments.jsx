import {HStack, Text, useToast, Center, Stack, Grid} from '@chakra-ui/react';
import {Spinner} from '@/ui-lib';
import {RemoveBankAccount} from '@/api/Settings';
import {useMutation, useQuery} from 'react-query';
import {makeeDepositToWallet} from '@/api/Wallet';
import {storeName} from '@/constants/routes';
import {fetchSavedCards} from '@/api/payment';
import openExternalUrl from '@/utils/openExternalLink';
import {IoIosAdd} from 'react-icons/io';
import {EmptyCardState} from '../EmptyCardState';
import {SettingsDetail} from '../SettingsDetails';
import {FiTrash2} from 'react-icons/fi';
import ThreeDots from '@/components/loaders/ThreeDots';

export const Payments = ({LoggedinUser}) => {
  const toast = useToast();
  const cards_query = useQuery(['saved_cards'], fetchSavedCards, {
    enabled: !!LoggedinUser,
  });
  const cards = cards_query?.data?.data?.results;

  const {mutate: removeCardMutate, isLoading: removingCard} = useMutation(
    values => RemoveBankAccount(values),
    {
      onSuccess: async res => {
        toast({
          description: `Card removed successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        await cards_query.refetch();
      },
      onError: err => {
        toast({
          title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) {
        openExternalUrl(link, '_blank');
      }
    },
    onError: err => {
      toast({
        title: 'Oops...',
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

  const handleRemove = id => {
    removeCardMutate(id);
  };

  const handleMakeDeposits = () => {
    const body = {
      amount: 50,
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  return (
    <Stack gap={{base: `14px`}}>
      <HStack gap={`10px`} justify={`space-between`} py={`10px`}>
        <Text
          color={`text`}
          fontSize={`16px`}
          fontWeight={`500`}
          lineHeight={`140%`}
          letterSpacing={`0.16px`}
          textTransform={`uppercase`}
        >
          Payment Method
        </Text>
        {cards?.length > 0 && (
          <Center
            color={`custom_color.color_pop`}
            fontSize={`20px`}
            bg={`custom_color.opacity_pop._10`}
            border={`1px solid`}
            borderColor={`custom_color.opacity_pop._20`}
            boxSize={`48px`}
            borderRadius={`50%`}
            cursor={`pointer`}
            onClick={handleMakeDeposits}
          >
            <IoIosAdd />
          </Center>
        )}
      </HStack>
      {cards_query?.isLoading ? (
        <Center padding={`30px`}>
          <ThreeDots />
        </Center>
      ) : cards?.length > 0 ? (
        <Grid
          templateColumns={{
            base: `repeat(6, 1fr)`,
            sm: `repeat(12, 1fr)`,
            xl: `repeat(24, 1fr)`,
          }}
          gap={{base: `16px`}}
        >
          {cards?.map((card, i) => (
            <SettingsDetail
              key={card?.id}
              label={`Debit Card`}
              // value={`Savings **** **** **** 8902`}
              value={`${card?.bank} **** **** **** ${card?.last4}`}
              action={{
                icon: removingCard ? (
                  <Spinner noAbsolute width={`20px`} height={`20px`} />
                ) : (
                  <FiTrash2 />
                ),
                handleClick: () => handleRemove(card.id),
              }}
              colSpan={{base: 6, xl: 8}}
            />
          ))}
        </Grid>
      ) : (
        <EmptyCardState handleAddCard={handleMakeDeposits} />
      )}
    </Stack>
  );
};
