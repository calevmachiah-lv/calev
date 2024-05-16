import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAttribute, useWindowSize } from '../../../utils/threekitHooks';
import {
  ItemWrapper,
  ItemImg,
  ItemsWrapper,
  FiltersWrapper,
  FilterTitle,
  FiltersTitlesWrapper,
  FiltersComponentWrapper,
  ItemName,
  ItemNoImg,
  ContainerStyle,
  DescriptionIconWrapper,
  DescriptionIcon,
  ItemNameWrapper,
} from './assetsAttr.styled';
import { useSelector } from 'react-redux';
import { getGlobalSettingsParams } from '../../../store/globalSettingsSlicer/selectors';
import { DESCRIPTION_ICON } from '../../../assets';
import ToolTip from '../../ToolTip';
import {
  BIG_SIZE_LABEL,
  DESCRIPTION_PLACEHOLDER,
  MEASURE_UNIT,
  OOB_APPNAME,
  SMALL_SIZE_LABEL,
  PATCH_STYLE_LABEL,
  TITLE_PLACEHOLDER,
  VERTICAL_SIZE_LABEL,
} from '../../../utils/constants';
import { getAttributeIndex } from '../../../utils/function/attributesHelperFn';
import { AssetsAttrProps } from '..';

interface AttributeItem {
  assetId: string;
  name: string;
  thumbnailPath?: string;
  thumbnailColor?: string;
  displayName: string;
  description?: string;
}

interface AttributeItemsComponentProps {
  attributeItems: AttributeItem[];
  handleChange: (value: string) => void;
  realSize: string;
  selectedValue: string | null;
  appName: string | undefined;
  isDesktop: boolean;
  isPatch?: boolean;
  noImage?: boolean;
}

const AttributeItemsComponent: React.FC<AttributeItemsComponentProps> = ({
  attributeItems,
  handleChange,
  realSize,
  selectedValue,
  appName,
  isDesktop,
  noImage = false
}) => {
  const [descriptionOpened, setDescriptionOpened] = useState<string | null>(
    null
  );
  const toggleDescription = useCallback(
    (name: string) => {
      if (descriptionOpened === name) {
        setDescriptionOpened(null);
      } else {
        setDescriptionOpened(name);
      }
    },
    [descriptionOpened]
  );

  const handleMouseEnterDescription = useCallback(
    (e: React.MouseEvent<HTMLElement>, value: string) => {
      toggleDescription(value);
      const targetBounding = (e.target as HTMLElement).getBoundingClientRect();
      const itemEl = document.getElementById(`item-${value}`);
      const tooltipEl = document.getElementById(`tooltip-${value}`);
      const tooltipArrowEl = document.getElementById(`tooltipArrow-${value}`);
      const itemElHeight = itemEl?.clientHeight || 0;
      const tooltipElHeight = tooltipEl?.clientHeight || 0;
      const tooltipArrowElHeight =
        tooltipArrowEl?.offsetHeight || tooltipArrowEl?.clientHeight || 0;
      const updatedTop =
        targetBounding.top +
        targetBounding.height -
        tooltipArrowElHeight -
        tooltipElHeight -
        itemElHeight;
      if (tooltipEl) {
        tooltipEl.style.top = updatedTop + MEASURE_UNIT;
      }
      if (tooltipArrowEl) {
        tooltipArrowEl.style.top = updatedTop + tooltipElHeight + MEASURE_UNIT;
      }
    },
    [toggleDescription]
  );

  const showDescriptionTooltip = useMemo((): boolean => {
    return appName === OOB_APPNAME && isDesktop && realSize === BIG_SIZE_LABEL;
  }, [appName, isDesktop, realSize]);

  return attributeItems.map((item, index) => {
    const value = item?.assetId;
    const isToneOnToneStyle =
      item?.name.toLowerCase() === 'tone on tone' ||
      item?.name.toLowerCase() === 'ton sur ton';
    const backgroudToDisplay = item?.thumbnailPath || item?.thumbnailColor;
    const backgroundImageKind = backgroudToDisplay?.includes('https');

    const showDescription = descriptionOpened === value;
    return (
      <ItemWrapper
        key={index}
        onClick={() => handleChange(value)}
        id={`item-${value}`}
      >
        {backgroudToDisplay ? (
          <>
            <ContainerStyle selected={selectedValue === value} size={realSize}>
              <ItemImg
                backgroudToDisplay={backgroudToDisplay}
                backgroundImageKind={backgroundImageKind}
                selected={selectedValue === value}
                isToneOnTone={isToneOnToneStyle}
              />
            </ContainerStyle>
            <ItemNameWrapper
              onMouseEnter={(e) =>
                showDescriptionTooltip
                  ? handleMouseEnterDescription(e, value)
                  : null
              }
              onMouseLeave={() =>
                showDescriptionTooltip ? toggleDescription(value) : null
              }
            >
              <ItemName>{item?.displayName}</ItemName>
              {showDescriptionTooltip && item?.description && (
                <DescriptionIconWrapper>
                  <DescriptionIcon src={DESCRIPTION_ICON} />
                </DescriptionIconWrapper>
              )}
            </ItemNameWrapper>
          </>
        ) : (
          <>
            <ItemNoImg selected={selectedValue === value} size={realSize} isImage={noImage}>
              {noImage ? item?.displayName?.charAt(0) : item?.displayName}
            </ItemNoImg>
            {noImage && (
              <ItemName>{item?.displayName}</ItemName>
            )}
            {showDescriptionTooltip && item?.description && (
              <DescriptionIconWrapper
                onMouseEnter={(e) => handleMouseEnterDescription(e, value)}
                onMouseLeave={() => toggleDescription(value)}
              >
                <DescriptionIcon src={DESCRIPTION_ICON} />
              </DescriptionIconWrapper>
            )}
          </>
        )}
        {showDescriptionTooltip && item?.description && (
          <ToolTip
            show={showDescription}
            title={item?.displayName || TITLE_PLACEHOLDER}
            text={item?.description || DESCRIPTION_PLACEHOLDER}
            backgroudToDisplay={backgroudToDisplay}
            id={value}
          />
        )}
      </ItemWrapper>
    );
  });
};

function AssetsAttr({
  attribute,
  size = SMALL_SIZE_LABEL,
  insideOptionalGroup,
  validValues,
  noImage
}: AssetsAttrProps) {
  let { appName } = useSelector(getGlobalSettingsParams);
  const { isMobile, isDesktop } = useWindowSize();
  const [attributeData, handleChange] = useAttribute(attribute.name);
  const selectedValue = useMemo(
    () => attributeData?.value?.assetId,
    [attributeData]
  );
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const filtersScroll = useRef<HTMLDivElement>();
  const isPatchStyle = useMemo(
    (): boolean => size === PATCH_STYLE_LABEL,
    [size]
  );
  const realSize = useMemo((): string => {
    if (appName === OOB_APPNAME && size === VERTICAL_SIZE_LABEL) {
      return BIG_SIZE_LABEL;
    } else if (isPatchStyle) {
      return SMALL_SIZE_LABEL;
    } else {
      return size;
    }
  }, [size, appName, isPatchStyle]);

  const valuesByFilters = useMemo((): Record<string, any> => {
    const assetsMap = new Map(
      attribute?.values
        ?.filter((el: any) => el.type === 'item')
        .map((asset) => [asset.assetId, asset])
    );
    const isFiltered = attribute?.metadata?.isFiltered === 'true';
    const valuesByFilters: Record<string, any> = {};
    if (isFiltered) {
      validValues.forEach((value) => {
        value = { ...value, ...assetsMap.get(value?.assetId) };
        const filter = value?.metadata?.filter || 'Other';
        if (!valuesByFilters[filter]) {
          valuesByFilters[filter] = [];
        }
        valuesByFilters[filter].push(value);
      });
    }
    return valuesByFilters;
  }, [validValues, attribute]);

  useEffect(() => {
    if (selectedValue === '' && getAttributeIndex(attributeData?.name) === 0) {
      handleChange(attributeData?.values?.[0]?.assetId);
    }
  }, [handleChange, selectedValue, attributeData]);

  useEffect(() => {
    if (filtersScroll.current) {
      const child = filtersScroll.current.children[activeFilter];
      if (child instanceof HTMLElement) {
        const scrollOptions: ScrollToOptions = {
          left: child.offsetLeft,
          behavior: 'smooth',
        };
        filtersScroll.current.scrollTo(scrollOptions);
      }
    }
  }, [activeFilter, isMobile]);

  const filtersComponent = useMemo((): ReactElement | null => {
    const isFiltered = attribute?.metadata?.isFiltered === 'true';

    if (isFiltered) {
      return (
        <FiltersComponentWrapper>
          {Object.keys(valuesByFilters).length > 1 && (
            <FiltersTitlesWrapper>
              {Object.keys(valuesByFilters).map((filter, index) => (
                <FilterTitle
                  key={index}
                  onClick={() => {
                    setActiveFilter(index);
                  }}
                  isActive={index === activeFilter}
                >
                  {filter}
                </FilterTitle>
              ))}
            </FiltersTitlesWrapper>
          )}
          <FiltersWrapper>
            {Object.values(valuesByFilters).map((attributeItems, index) => {
              return index === activeFilter ? (
                <ItemsWrapper
                  size={realSize}
                  insideOptionalGroup={insideOptionalGroup}
                  key={index}
                  isActiveFilter={index === activeFilter}
                >
                  <AttributeItemsComponent
                    attributeItems={attributeItems || []}
                    handleChange={handleChange}
                    realSize={realSize}
                    selectedValue={selectedValue}
                    appName={appName}
                    isDesktop={isDesktop}
                    isPatch={isPatchStyle}
                    noImage={noImage}
                  />
                </ItemsWrapper>
              ) : null;
            })}
          </FiltersWrapper>
        </FiltersComponentWrapper>
      );
    } else {
      return null;
    }
  }, [
    realSize,
    valuesByFilters,
    activeFilter,
    setActiveFilter,
    handleChange,
    selectedValue,
    appName,
    isDesktop,
    insideOptionalGroup,
    isPatchStyle,
    attribute,
  ]);

  const finalComponent = useMemo((): ReactElement => {
    if (filtersComponent) {
      return filtersComponent;
    } else {
      return (
        <ItemsWrapper size={realSize} insideOptionalGroup={insideOptionalGroup}>
          <AttributeItemsComponent
            attributeItems={validValues || []}
            handleChange={handleChange}
            realSize={realSize}
            selectedValue={selectedValue}
            appName={appName}
            isDesktop={isDesktop}
            noImage={noImage}
          />
        </ItemsWrapper>
      );
    }
  }, [
    filtersComponent,
    validValues,
    realSize,
    handleChange,
    selectedValue,
    appName,
    isDesktop,
    insideOptionalGroup,
    noImage
  ]);

  return finalComponent;
}

export default AssetsAttr;
