import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18next';
import { useAttribute, useWindowSize } from '../../../utils/threekitHooks';
import { ATTRIBUTE_TYPES, OOB_APPNAME } from '../../../utils/constants';
import { WrapperTextInput, WarningText } from './textInput.styled';
import { getGlobalSettingsParams } from '../../../store/globalSettingsSlicer/selectors';
import { checkTextPurity } from '../../../utils/ApiCalls/ApiCalls';
import {
  getFormTextInputFields,
  setFormTextInputFields,
} from '../../../store/validationSlicer';
import { debounce } from '../../../utils/function/debounce';
import { ITextInputEngraving } from '..';
import { useInputDirection } from '../../../hooks';

export const TextInputEngraving = ({
  attribute,
  type = 'text',
  insideOptionalGroup,
}: ITextInputEngraving) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useInputDirection({ inputRef });
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const [attributeData, setAttributeData] = useAttribute(attribute.name!);
  const { appName, lng, token, timestamp } = useSelector(
    getGlobalSettingsParams
  );

  const regexString =
    attributeData?.metadata?.regex?.slice(1, -1)?.replace(/\\\\/g, '\\') || '';
  const minLength = attributeData?.metadata?.minLength || '';
  const maxLength = attributeData?.metadata?.maxLength || '';
  const regexPattern = regexString ? new RegExp(regexString) : null;
  const [isPure, setIsPure] = useState<boolean>(true);
  const formTextInputFields = useSelector(getFormTextInputFields);

  const memoizedCheckText = useMemo(() => {
    return async (text: string) => {
      if (!text || text?.length <= 1) {
        setIsPure(true);
        return;
      }
      const purity = await checkTextPurity({
        text,
        lng: String(lng),
        isMobile
      });
      setIsPure(purity.valid);
    };
  }, [lng, isMobile, appName, token, timestamp]);

  const debouncedCheck = debounce(async (text: string) => {
    await memoizedCheckText(text);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || value?.length <= 1) {
      if (!value) {
        setAttributeData('');
      }
      setIsPure(true);
    }

    if (!regexPattern?.test(e.target.value) && value?.length > 0) {
      e.preventDefault();
      return;
    }

    const currentFormTextInputFields = {
      ...formTextInputFields,
      [attribute.name!]: value,
    };

    dispatch(setFormTextInputFields(currentFormTextInputFields));

    if (type === 'text') {
      debouncedCheck(value);
    }
  };

  useEffect(() => {
    const inputValue = formTextInputFields[attribute.name!];
    if (!isPure) {
      setAttributeData('');
    } else {
      if (!inputValue) {
        setAttributeData('');
        return;
      }

      if (!regexPattern || regexPattern.test(inputValue)) {
        setAttributeData(inputValue);
      }
    }
  }, [formTextInputFields[attribute.name!], isPure]);

  return (
    <>
      <WrapperTextInput
        onChange={handleChange}
        value={
          (formTextInputFields && formTextInputFields[attribute.name!]) ||
          attributeData?.value ||
          ''
        }
        placeholder={appName === OOB_APPNAME ? attributeData?.displayName : ''}
        minLength={minLength}
        maxLength={maxLength}
        insideOptionalGroup={insideOptionalGroup}
        ref={inputRef}
      />

      {!isPure && (
        <WarningText>
          {t(
            'key.for.warning.message.here',
            "Sorry, the text you've entered does not fit within our guidelines"
          )}
          <br />
          {t('key.for.input.new.text.here', 'Please enter a new text')}
        </WarningText>
      )}
    </>
  );
};

TextInputEngraving.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.string,
  ATTRIBUTE_TYPES.number,
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.arraySelector,
]);

export default TextInputEngraving;
