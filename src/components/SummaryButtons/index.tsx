import {
  ADDTOBAG_BUTTON_LABEL,
  MODIFY_BUTTON_LABEL,
} from '../../utils/constants';
import OptionsButton from '../Form/OptionsButton';
import { Wrapper } from './SummaryButtons.styles';

export const SummaryButtons = () => {
  return (
    <Wrapper>
      <OptionsButton buttonName={ADDTOBAG_BUTTON_LABEL} />
      <OptionsButton buttonName={MODIFY_BUTTON_LABEL} />
    </Wrapper>
  );
};
