import {Icon, Landscape, Nature, Recreation, Security} from '@/components/assets/Amenities';

export const AmenityIcon = ({name, width, height}) => {
  switch (name.toLowerCase()) {
    case `nature`:
      return <Nature width={width} height={height} />;
    case `recreational area`:
      return <Recreation width={width} height={height} />;
    case `security`:
      return <Security width={width} height={height} />;
    case `ladnscape`:
      return <Landscape width={width} height={height} />;
    default:
      return <Landscape width={width} height={height} />;
    // return <Icon width={width} height={height}/>;
  }
};
