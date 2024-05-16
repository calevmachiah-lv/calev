import { Dispatch, SetStateAction } from 'react';
import { IAttribute } from 'store/threekitSlicer';

const generateNumberAttributeValues = (attribute: IAttribute) => {
  const length = (attribute.max + attribute.step) / attribute.step;
  return Array.from({ length }, (_, index) => index * attribute.step);
};

const add2DSpinTool = (
  {
    attributeId,
    direction = 1,
    maxWidth = 0,
  }: { attributeId: string; direction?: number; maxWidth?: number },
  handleLastAngle: (angle: number) => void,
  isRotable: boolean,
  isFullScreen: boolean,
  setToggleButton: Dispatch<SetStateAction<boolean>>,
  handleFullScreen: () => void
) => {
  const player = window.threekit.player;
  const configurator = window.threekit.configurator;
  const attribute = configurator
    .getDisplayAttributes()
    .find(({ id }: { id: string }) => id === attributeId);
  if (!attribute) {
    return;
  }
  const attrName = attribute.name;
  const attributeValues = generateNumberAttributeValues(attribute);
  const configuration = configurator.getConfiguration();
  let curPct = configuration[attrName];
  const attrCount = attributeValues.length;
  const threshold = 1 / attrCount;

  player.tools.addTool({
    key: 'zoom',
    active: false,
    enabled: false,
  });

  !isFullScreen && player.tools.addTool({
    key: '2Dspin',
    active: isRotable,
    enabled: isRotable,
    handlers: {
      drag: () => ({
        handle: async (event:any) => {
          const configuration = configurator.getConfiguration();
          const deltaT = event.deltaX / Math.max(event.rect.width, maxWidth);
          const newPct = curPct + deltaT;
          if (Math.abs(newPct) < 0.05 && Math.abs(newPct) > threshold) {
            const currentValueIndex = attributeValues.findIndex(
              (attributeValue) => attributeValue === configuration[attrName]
            );
            const increment = (newPct > 0 ? 1 : -1) * (direction < 0 ? -1 : 1);
            const newIndex = (currentValueIndex + increment) % attrCount;
            const attributeValue =
              attributeValues[newIndex < 0 ? attrCount + newIndex : newIndex];
            configurator.setConfiguration({ [attrName]: attributeValue });
            handleLastAngle(+`${attributeValue}`);
          }
          curPct = newPct % threshold;
        },
        momentum: true,
      }),
    },
  });

  const putZoom = (isPinch?:boolean, doubleClick?:boolean) => {

    if (isPinch) return;
    if (doubleClick) {
      handleFullScreen();
    }
    removeIcon();
    player.tools.addTool('zoom');
    player.tools.removeTool('2Dspin');
  };

  const removeIcon = () => {
    setTimeout(() => {
      setToggleButton(false);
    }, 3000);
  };


  const removeZoom = () => {
    player.tools.removeTool('zoom');
    player.tools.addTool({
      key: '2Dspin',
      active: isRotable,
      enabled: isRotable,
      handlers: {
        drag: () => ({
          handle: async (event: any) => {
            const configuration = configurator.getConfiguration();
            const deltaT = event.deltaX / Math.max(event.rect.width, maxWidth);
            const newPct = curPct + deltaT;
            if (Math.abs(newPct) < 0.05 && Math.abs(newPct) > threshold) {
              const currentValueIndex = attributeValues.findIndex(
                (attributeValue) => attributeValue === configuration[attrName]
              );
              const increment =
                (newPct > 0 ? 1 : -1) * (direction < 0 ? -1 : 1);
              const newIndex = (currentValueIndex + increment) % attrCount;
              const attributeValue: number =
                attributeValues[newIndex < 0 ? attrCount + newIndex : newIndex];
              configurator.setConfiguration({ [attrName]: attributeValue });
              handleLastAngle(attributeValue);
            }
            curPct = newPct % threshold;
          },
          momentum: true,
        }),
      },
    });
  };

  isFullScreen ? putZoom() : removeZoom();
};

export default add2DSpinTool;
