import { useMemo } from 'react';
import {
  DONE_BUTTON_LABEL,
  SURPRISE_ME_BUTTON_LABEL,
} from '../../utils/constants';
import { useWindowSize } from '../../utils/threekitHooks';
import OptionsButton from '../Form/OptionsButton';
import { Wrapper } from './FunctionalButtons.style';
import { useSelector } from 'react-redux';

const FunctionalButtons = () => {

  const disabledDoneButton = useMemo(() => {
    let disabled = true;
    if (
      !Object.values(
        window?.dataDrivenConfiguratorExtension?.getStatus()?.attributes
      ).includes('NA')
    ) {
      disabled = false;
    }
    return disabled;
  }, [window?.dataDrivenConfiguratorExtension?.getStatus()?.attributes]);
  return (
    <Wrapper>
      <OptionsButton buttonName={SURPRISE_ME_BUTTON_LABEL} />
      <OptionsButton disable={disabledDoneButton} buttonName={DONE_BUTTON_LABEL} />
    </Wrapper>
  );
};

export default FunctionalButtons;
