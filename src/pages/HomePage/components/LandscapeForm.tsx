import React from 'react';
import {
  BackgroundWrapper,
  BesideAttributesContainer,
  BottomFormContainer,
  FormContainer,
  SelectionSummaryIcon,
  TitlePriceContainer,
  TopFormContainer,
  ValuesContainer,
} from './landscapeForm.styles';
import Attributes from '../../../components/Attributes';
import ActiveAttributeTitle from '../../../components/ActiveAttributeTitle';
import { SUMMARY_ICON } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupedAttributes } from '../../../store/threekitSlicer';
import AttributeValues from '../../../components/AttributeValues';
import useActiveAttribute from '../../../hooks/useActiveAttribute';
import SelectedValuesOfAttribute from '../../../components/SlectedValuesOfAttribute';
import {
  closeRecap,
  getDisplayRecap,
  getTutorial,
  openRecap,
} from '../../../store/flowSlicer';
import RecapPage from '../../RecapPage';
import FunctionalButtons from '../../../components/FunctionalButtons';
import ProductInfos from './ProductInfos';
import BottomContainer from './BottomContainer';

interface LandscapeFormProps { }

const LandscapeForm: React.FC<LandscapeFormProps> = () => {
  const dispatch = useDispatch();
  const { displayTutorial, tutorialStep } = useSelector(getTutorial);
  const groupedAttributes = useSelector(getGroupedAttributes) || {};
  const { activeAttribute, selectedValues } = useActiveAttribute();
  const displayRecap = useSelector(getDisplayRecap);

  return (
    <FormContainer>
      <ProductInfos />
      <TopFormContainer>
        <BesideAttributesContainer>
          <SelectionSummaryIcon
            src={SUMMARY_ICON}
            onClick={() => {
              dispatch(openRecap(true));
            }}
          />
          <TitlePriceContainer>
            <ActiveAttributeTitle />
            <SelectedValuesOfAttribute selectedValues={selectedValues} />
          </TitlePriceContainer>
        </BesideAttributesContainer>
        <Attributes
          tutorialStep={tutorialStep}
          displayTutorial={displayTutorial}
        />
        <FunctionalButtons />
      </TopFormContainer>
      <BottomFormContainer>
        {Object.entries(groupedAttributes).map(([groupName, attributes]) => {
          const attribute = attributes[0];
          return (

            <BottomContainer attribute={attribute} attributes={attributes} />
           
          );
        })}
      </BottomFormContainer>
      <RecapPage show={displayRecap} />
      <BackgroundWrapper
        show={displayRecap}
        onClick={() => dispatch(closeRecap(true))}
      />
    </FormContainer>
  );
};

export default LandscapeForm;
