import React from 'react';
import { ButtonsContainer } from '../SummaryPage.styles';
import OptionsButton from '../../../components/Form/OptionsButton';
import {
  ADDTOBAG_BUTTON_LABEL,
  CATALOGDESKTOP_APPNAME,
  EDIT_BUTTON_LABEL,
} from '../../../utils/constants';
import { useWindowSize } from '../../../utils/threekitHooks';
import useLeadTime from '../../../hooks/useAvaibility';

export const ButtonsSection = ({
  appName,
}: {
  appName: string | undefined;
}) => {
  const { isMobile } = useWindowSize();
  const { leadTime: leadTimeData } = useLeadTime();

  return (
    <ButtonsContainer>
      <OptionsButton buttonName={EDIT_BUTTON_LABEL} />
      {!(appName === CATALOGDESKTOP_APPNAME && !isMobile) ? (
        <OptionsButton
          buttonName={ADDTOBAG_BUTTON_LABEL}
          leadTime={leadTimeData}
        />
      ) : null}
    </ButtonsContainer>
  );
};

export default ButtonsSection;
