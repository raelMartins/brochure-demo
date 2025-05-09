import {Box, Center, Stack, Tooltip} from '@chakra-ui/react';
import {ScheduleInspection} from '@/components/drawers/schedule_inspection/ScheduleInspection';
import {ContactPerson} from '@/components/drawers/contact_person/ContactPerson';
import {
  ContactPersonIcon,
  ScheduleInspectionIcon,
  ViewBrochureIcon,
} from '@/components/assets/SideBarIcons';
import {useQuery} from 'react-query';
import {fetchProjectsById} from '@/api/listing';
import {ToggleWatchlist} from '@/components/drawers/watchlist/ToggleWatchlistButton';

export const icon_tooltip_style = {
  bg: '#F5F5F5',
  color: '#000000',
  border: '1px solid #E5E5E5',
  rounded: '4px',
  boxShadow: 'none',
  fontSize: `10px`,
  fontWeight: `400`,
  letterSpacing: `6%`,
};

export const PropertySidebar = ({property_id}) => {
  const {data, isError, isLoading, error, refetch} = useQuery(
    ['project_data', property_id],
    () => fetchProjectsById(parseInt(property_id)),
    {
      enabled: !!property_id,
    }
  );

  const info = data?.data?.project;
  const brochure = info?.property_document?.find(el => el.purpose === 'brochure');

  return (
    <Stack
      align="center"
      justify="center"
      minW="75px"
      position={{base: `fixed`, md: `relative`}}
      left={{base: `24px`, md: `0px`}}
      top={{base: `60vh`, md: `0px`}}
      zIndex={`1`}
    >
      {info && (
        <Stack
          gap={{base: `20px`, md: '64px'}}
          direction={{base: `row`, md: `column`}}
          p={{base: `12px`, md: `0px`}}
          background={{base: `matador_background.200`, md: `transparent`}}
          borderRadius={{base: `4px`, md: `none`}}
          border={{base: `1px solid`, md: `none`}}
          borderColor={{base: `matador_border_color.100`, md: `none`}}
        >
          <ToggleWatchlist info={info} refetch={refetch} />
          <ContactPerson
            property_id={property_id}
            info={info}
            InnerComponent={
              <Box
                variant={5}
                overflow={`hidden`}
                borderRadius={`50%`}
                as={Center}
                boxSize={{base: `32px`, md: `48px`}}
                color={`custom_color.color_pop`}
                border={`1px solid`}
                borderColor={`custom_color.opacity_pop._20`}
                bg={`custom_color.opacity_pop._10`}
              >
                <ContactPersonIcon
                  height={{base: `18px`, md: `20px`}}
                  width={{base: `18px`, md: `20px`}}
                />
              </Box>
            }
          />
          <ScheduleInspection
            property_id={property_id}
            info={info}
            InnerComponent={
              <Box
                variant={5}
                overflow={`hidden`}
                borderRadius={`50%`}
                as={Center}
                boxSize={{base: `32px`, md: `48px`}}
                border={`1px solid`}
                borderColor={`custom_color.opacity_pop._20`}
                bg={`custom_color.opacity_pop._10`}
              >
                <ScheduleInspectionIcon
                  height={{base: `18px`, md: `20px`}}
                  width={{base: `18px`, md: `20px`}}
                />
              </Box>
            }
          />

          <Tooltip label={`View Brochure`} placement="top" sx={icon_tooltip_style}>
            <span>
              <Box
                variant={5}
                overflow={`hidden`}
                borderRadius={`50%`}
                as={Center}
                boxSize={{base: `32px`, md: `48px`}}
                border={`1px solid`}
                borderColor={`custom_color.opacity_pop._20`}
                bg={`custom_color.opacity_pop._10`}
                cursor={`pointer`}
                onClick={() => window.open(brochure?.document_url || brochure?.document_file)}
              >
                <ViewBrochureIcon
                  height={{base: `18px`, md: `20px`}}
                  width={{base: `18px`, md: `20px`}}
                />
              </Box>
            </span>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};
