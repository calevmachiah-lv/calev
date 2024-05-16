import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ElsePhoto,
  ElsePhotosWrapper,
  ElsePhotoWrapper,
} from './photosDisplayer.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentMode,
  getCurrentModelView,
  getForm,
  getLastAngle,
  getPlayer3DImage,
  setCurrentMode,
  setCurrentModelView,
  setViewUpdate,
  setLastAngle,
} from '../../store/threekitSlicer';
import { getStep } from '../../store/globalSettingsSlicer';

import {
  Arrow,
  ArrowContainer,
} from '../../components/ArrowsComponent/Arrows.styles';
import { LEFT_ARROW_SLIDER, RIGHT_ARROW_SLIDER } from '../../assets';
import { useAttribute, useValidAttributes } from '../../utils/threekitHooks';
import { getFormTextInputFields } from '../../store/validationSlicer';
import { updateForm } from '../../utils/function/attributeFn';
import { isTextAttribute, hasPatch } from '../../utils/function/functions';

interface Photos {
  [key: string]: string;
}

interface PhotosDisplayerProps {
  photos: Photos;
  mainKey?: string;
  setPhotoLoaded: (loaded: boolean) => void;
  showPlayer?: boolean;
  playerKey?: string;
  clientPage: boolean;
}

const PhotosDisplayer: React.FC<Partial<PhotosDisplayerProps>> = () => {
  const dispatch = useDispatch();
  const [mainPhotoKey, setMainPhotoKey] = useState<number>(0);
  const currentMode = useSelector(getCurrentMode);
  const lastAngle = useSelector(getLastAngle);
  const currentViewPresentation = useSelector(getCurrentModelView);
  const currentStep = useSelector(getStep);
  const { getIsAttributeValid } = useValidAttributes();
  const form = useSelector(getForm);
  const [modelViewsStable, setModelViewsStable] = useState([]);
  const formTextInputFields = useSelector(getFormTextInputFields);
  const currentModelPresentation = useSelector(getCurrentModelView);
  const [isViewClick, setIsViewClick] = useState(false);
  const currentGroup: Record<string, string> | undefined = useMemo(() => {
    if (form) {
      const formValidAttributes = updateForm(form, getIsAttributeValid);
      if (currentStep !== -1) {
        return Object.values(formValidAttributes)?.[currentStep];
      }
    }
  }, [formTextInputFields, currentStep]);

  const carousel = useMemo(() => {
    return window?.dataDrivenConfiguratorExtension?.getStatus()?.carousel;
  }, [window?.dataDrivenConfiguratorExtension?.getStatus()?.carousel?.items]);

  const modelViews = useMemo(() => {
    if (currentGroup && isTextAttribute(currentGroup)) {
      if (modelViewsStable?.length === 0) {
        return carousel.items;
      } else if (modelViewsStable?.length > 0 && hasPatch()) {
        return modelViewsStable;
      }
    }

    return carousel?.items;
  }, [carousel, currentGroup]);

  const photoWidth = useMemo(() => {
    return modelViews ? 100 / modelViews.length + '%' : '20%';
  }, [modelViews]);

  useEffect(() => {
    if (currentGroup) {
      if (isTextAttribute(currentGroup) && hasPatch()) {
        if (!modelViewsStable || carousel.items > modelViewsStable) {
          setModelViewsStable(carousel.items);
        }
      }
    }
  }, [currentGroup]);
  useEffect(() => {
    if (currentMode === '2D') {
      const viewIndex = modelViews?.findIndex(
        (element: any) =>
          element.configuration['Rotate Model'] === lastAngle &&
          element.configuration['Model Presentation'] ===
          currentViewPresentation
      );
      if (viewIndex != undefined && viewIndex !== -1) {
        if (modelViews[viewIndex].configuration) setMainPhotoKey(viewIndex);
      }
    }
  }, [lastAngle]);

  useEffect(() => {
    let index = -1;
    if (currentMode !== '3D') {
      index = modelViews?.findIndex(
        (element: Record<string, any>) =>
          element.PlayerType === currentMode &&
          currentModelPresentation ===
          element.configuration['Model Presentation']
      );
    } else {
      index = modelViews.length - 1;
    }
    if (index !== undefined && index !== -1 && !isViewClick) {
      setTimeout(() => {
        setMainPhotoKey(index);
      }, 500);
    }
  }, [currentMode, currentModelPresentation]);

  useEffect(() => {
    if (modelViewsStable !== carousel?.items) {
      setModelViewsStable(carousel?.items);
    }
  }, [currentStep]);

  const setNewView = useCallback(
    async (view: Record<string, any>, key: number) => {
      if (view && 0 <= key && key <= modelViews.length) {
        setIsViewClick(true);
        const viewModelPresentation = view?.configuration['Model Presentation'];
        const viewRotate = view?.configuration['Rotate Model'];
        await window.dataDrivenConfigurator.setConfiguration({
          'Model Presentation': viewModelPresentation,
          'Rotate Model': viewRotate,
        });

        dispatch(setViewUpdate(true));

        dispatch(setCurrentModelView(viewModelPresentation));
        dispatch(setCurrentMode(view.PlayerType));
        dispatch(setLastAngle(viewRotate));

        setMainPhotoKey(key);

        setTimeout(() => {
          setIsViewClick(false);
          dispatch(setViewUpdate(false));
        }, 50);
      }
    },
    [modelViews, dispatch]
  );

  return (
    modelViews?.length && (
      <ElsePhotosWrapper>
        {modelViews?.length > 0 && (
          <ArrowContainer>
            <Arrow
              image={LEFT_ARROW_SLIDER}
              onClick={() =>
                setNewView(modelViews[mainPhotoKey - 1], mainPhotoKey - 1)
              }
            />
            <Arrow
              image={RIGHT_ARROW_SLIDER}
              onClick={() =>
                setNewView(modelViews[mainPhotoKey + 1], mainPhotoKey + 1)
              }
            />
          </ArrowContainer>
        )}
        {modelViews?.map(
          (item: Record<string, any>, key: number) =>
            item.PlayerType === '2D' && (
              <ElsePhotoWrapper
                key={key}
                onClick={() => setNewView(item, key)}
                selected={key === mainPhotoKey && currentMode === '2D'}
                width={photoWidth}
              >
                <ElsePhoto imageToDisplay={item?.thumbnailUrl} />
              </ElsePhotoWrapper>
            )
        )}
        {modelViews &&
          modelViews[modelViews.length - 1].PlayerType === '3D' && (
            <ElsePhotoWrapper
              onClick={() =>
                setNewView(
                  modelViews[modelViews.length - 1],
                  modelViews.length - 1
                )
              }
              selected={currentMode === '3D'}
              width={photoWidth}
            >
              <ElsePhoto
                imageToDisplay={modelViews[modelViews.length - 1]?.thumbnailUrl}
              />
            </ElsePhotoWrapper>
          )}
      </ElsePhotosWrapper>
    )
  );
};

export default PhotosDisplayer;
