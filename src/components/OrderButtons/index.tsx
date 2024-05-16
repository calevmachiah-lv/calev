import {
  TouchEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  MainWrapper,
  DataWrapper,
  CloseButton,
  Title,
  Text,
  ButtonsWrapper,
  ButtonTextWrapper,
  ButtonLabel,
  ButtonSubLabel,
  ButtonWrapper,
} from './orderButtons.styles';
import {
  CLOSE_ICON_BLACK,
  LEFT_ARROW_SLIDER_BLACK,
  RIGHT_ARROW_SLIDER_BLACK,
} from '../../assets';
import useSwipe from '../../hooks/useSwipe';

// Mock data
const buttons = {
  next: {
    findInStore: {
      label: 'Find in store',
      next: {
        text: 'Find the nearest store to you',
        store: {
          label: 'Store',
          subLabel: 'Louis Vuitton',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
          next: {
            text: 'Louis Vuitton Store, 5th Avenue, New York',
            address: {
              label: 'Address',
              subLabel: 'Louis Vuitton Store, 5th Avenue, New York',
              img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
            },
            openingHours: {
              label: 'Opening hours',
              subLabel: 'Mon-Sat: 10AM - 8PM, Sun: 11AM - 6PM',
              img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
            },
          },
        },
        address: {
          label: 'Address',
          subLabel: 'Louis Vuitton Store, 5th Avenue, New York',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
        },
        openingHours: {
          label: 'Opening hours',
          subLabel: 'Mon-Sat: 10AM - 8PM, Sun: 11AM - 6PM',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
        },
      },
    },
    productDetails: {
      label: 'Product details',
      next: {
        text: 'The Speedy 18 is the perfect miniature version of Louis Vuitton’s iconic Speedy bag. Crafted from Monogram canvas with natural cowhide trim, it features two top handles and a detachable strap for shoulder or cross-body wear. The bag’s secure zip closure opens to reveal a spacious, well-organized interior. The Speedy 18 can be carried by hand, on the shoulder, or across the body.',
        bag: {
          label: 'Bag',
          subLabel: 'Veautwist Wisteria',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
        },
        charms: {
          label: 'Charms',
          subLabel: 'LV Logo white | Cake Creme | Eiffel Tower',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
          next: {
            text: 'With the new Adjustable Strap, it’s easy to customize your Speedy bag to suit your style. Crafted from Monogram canvas, this versatile strap features a VVN leather shoulder pad and gold-color hardware. It’s adjustable for comfortable shoulder or cross-body wear, and can be used with a variety of bags in the Louis Vuitton collection.',
            moreDetails: {
              label: 'More details',
              subLabel: 'Adjustable Strap',
              img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
            },
          },
        },
        carryStyle: {
          label: 'Carry Style',
          subLabel: 'Short strap 40',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
        },
        addOn: {
          label: 'Add-on',
          subLabel: 'Heart purse',
          img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
        },
      },
    },
    deliveryAndReturns: {
      label: 'Delivery & returns',
      next: null,
    },
    gifting: {
      label: 'Gifting',
      next: null,
    },
  },
};

const DataComponent = ({
  button,
  firstPage,
  handleButtonClick,
}: {
  button: any;
  firstPage: boolean;
  handleButtonClick: (button: any) => void;
}) => {
  return (
    <>
      {button?.label && <Title firstPage={firstPage}>{button.label}</Title>}
      {button?.next && (
        <>
          {button.next?.text && <Text>{button.next.text}</Text>}
          <ButtonsWrapper>
            {Object.entries(button.next).map(
              ([key, value]: [string, any]) =>
                key !== 'text' && (
                  <ButtonWrapper
                    key={key}
                    onClick={() => handleButtonClick(value)}
                  >
                    {value.img && (
                      <img
                        className="thumbnail"
                        src={value.img}
                        alt={value.label}
                      />
                    )}
                    <ButtonTextWrapper>
                      <ButtonLabel>{value.label}</ButtonLabel>
                      <ButtonSubLabel>{value.subLabel}</ButtonSubLabel>
                    </ButtonTextWrapper>
                    <img
                      className="arrow"
                      src={RIGHT_ARROW_SLIDER_BLACK}
                      alt="right arrow"
                    />
                  </ButtonWrapper>
                )
            )}
          </ButtonsWrapper>
        </>
      )}
    </>
  );
};

export const OrderButtons = () => {
  const [openedButton, setOpenedButton] = useState<any | null>(buttons);
  const [prevStack, setPrevStack] = useState<any[]>([buttons]);
  const wrapperComponent = useRef<HTMLDivElement>(null);
  const openedComponent = useRef<HTMLDivElement>(null);
  const { handleTouchStart, handleTouchEnd } = useSwipe(
    () => handleClose(),
    () => {},
    100
  );

  const firstPage = prevStack.length === 2;
  const opened = prevStack.length > 1;

  const slideComponent = useCallback((direction: 'left' | 'right') => {
    if (!openedComponent.current) return;
    openedComponent.current.style.transition = 'none';
    openedComponent.current.style.transform =
      direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
    setTimeout(() => {
      if (!openedComponent.current) return;
      openedComponent.current.style.transition = 'transform 0.3s, top 0.3s';
      openedComponent.current.style.transform = 'translateX(0)';
    }, 0);
  }, []);

  const handleButtonClick = useCallback(
    (button: any) => {
      if (opened) slideComponent('right');
      setPrevStack([...prevStack, button]);
      setOpenedButton(button);
    },
    [prevStack, opened, slideComponent]
  );

  const handleClose = () => {
    if (!openedComponent.current) return;
    if (prevStack.length > 2) slideComponent('left');
    const prevStackVar = [...prevStack];
    const prevButton = prevStackVar[prevStackVar.length - 2];
    setOpenedButton(prevButton || null);
    setPrevStack(prevStackVar.slice(0, prevStackVar.length - 1));
  };

  return (
    <>
      <MainWrapper>
        <DataComponent
          button={buttons}
          firstPage={true}
          handleButtonClick={handleButtonClick}
        />
      </MainWrapper>

      <DataWrapper
        open={opened}
        ref={wrapperComponent}
        onTouchStart={
          handleTouchStart as unknown as TouchEventHandler<HTMLDivElement>
        }
        onTouchEnd={
          handleTouchEnd as unknown as TouchEventHandler<HTMLDivElement>
        }
      >
        <div ref={openedComponent} style={{ position: 'relative' }}>
          <CloseButton
            className={firstPage ? 'close' : 'back'}
            onClick={handleClose}
            src={firstPage ? CLOSE_ICON_BLACK : LEFT_ARROW_SLIDER_BLACK}
          />
          <DataComponent
            button={openedButton}
            firstPage={firstPage}
            handleButtonClick={handleButtonClick}
          />
        </div>
      </DataWrapper>
    </>
  );
};
