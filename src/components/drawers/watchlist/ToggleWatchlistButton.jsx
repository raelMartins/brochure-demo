'use client';

import {fetchWatchlist, toggleWatchlistApi} from '@/api/watchlist';
import {AddToWatchListIcon, RemoveFromWatchListIcon} from '@/components/assets/SideBarIcons';
import {icon_tooltip_style} from '@/components/page-components/listings/PropertySidebar';
import {ColorBackground} from '@/ui-lib';
import {useLightenHex} from '@/utils/lightenColorShade';
import {Box, Center, Tooltip, useTheme, useToast} from '@chakra-ui/react';
import {useMutation, useQuery} from 'react-query';

export const ToggleWatchlist = ({refetch, info}) => {
  const toast = useToast();
  const {data: watchlistData, refetch: watchlistRefetch} = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );
  const watchlist = watchlistData?.data?.watchlist;

  const isWatchlisted = watchlist?.find(ppt => ppt?.project?.id === info?.id);

  const toggleWatchlistMutation = useMutation(body => toggleWatchlistApi(body.id), {
    onSuccess: async res => {
      toast({
        description: isWatchlisted ? `Removed from watchlist` : `Added to watchlist`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await refetch();
      await watchlistRefetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.code} : ${err?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleWatchlist = e => {
    if (toggleWatchlistMutation.isLoading) return;
    e.stopPropagation();
    return toggleWatchlistMutation.mutate({id: info?.id});
  };
  return (
    <Tooltip
      label={isWatchlisted ? `Remove From Watch List` : `Add To Watch List`}
      placement="top"
      sx={icon_tooltip_style}
    >
      <span>
        <Center
          variant={5}
          overflow={`hidden`}
          borderRadius={`50%`}
          boxSize={{base: `32px`, md: `48px`}}
          color={`custom_color.color_pop`}
          border={`1px solid`}
          borderColor={`custom_color.opacity_pop._20`}
          bg={`custom_color.opacity_pop._10`}
          onClick={handleWatchlist}
          cursor={`pointer`}
        >
          {isWatchlisted ? (
            <RemoveFromWatchListIcon
              height={{base: `18px`, md: `20px`}}
              width={{base: `18px`, md: `20px`}}
            />
          ) : (
            <AddToWatchListIcon
              height={{base: `18px`, md: `20px`}}
              width={{base: `18px`, md: `20px`}}
            />
          )}
        </Center>
      </span>
    </Tooltip>
  );
};
