import {
  enqueueSnackbar,
  closeSnackbar,
  VariantType,
  SnackbarOrigin,
} from 'notistack';
import { t } from 'i18next';
import { popUpPosition } from './PopupPosition';
import { isRightToLeft } from '../../utils/function/functions';

export interface PopUpType {
  popUpMessage: string;
  popUpMessageKey: string;
  autoHideDuration?: number;
  preventDuplicate?: boolean;
  variant?: VariantType;
  style?: any;
  [key: string]: any;
}

interface ShowPopUpParams {
  popUpType: PopUpType;
  message?: string;
  isMobile?: boolean;
  functionOnClose?: () => void;
}

export function showPopUp({
  popUpType,
  message,
  functionOnClose,
}: ShowPopUpParams): void {
  const {
    popUpMessage,
    popUpMessageKey,
    autoHideDuration,
    preventDuplicate,
    variant,
    style,
  } = popUpType || {};

  const messageToDisplay = message
    ? t(popUpMessageKey, {
      field: message,
      defaultValue: `${popUpMessage}: ${message}`,
    })
    : t(popUpMessageKey, popUpMessage);
  if (!messageToDisplay) return;
  const width = Math.max(
    window.screen.width,
    window.innerWidth,
    document.documentElement.clientWidth
  );

  const height = Math.min(
    window.screen.height,
    window.innerHeight,
    document.documentElement.clientHeight
  );
  const anchorOrigin: SnackbarOrigin = popUpPosition(width, height);

  enqueueSnackbar(t(messageToDisplay, messageToDisplay), {
    autoHideDuration,
    onClose: functionOnClose ? () => functionOnClose() : undefined,
    preventDuplicate,
    variant,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    style,
    content: (key, message) => (
      <div key={key} style={{ ...style }}>
        {style.leftImage && (
          <img src={style.leftImage} alt="Info" style={style.leftImageStyle} />
        )}
        <div
          style={{
            padding: '5px',
          }}
        >
          {message}
        </div>
        <div onClick={() => closeSnackbar(key)} style={{ cursor: 'pointer', fontSize: '18px', width: '100%', maxWidth: '50px', fontWeight: 'bolder' }}>
          &#x2715;
        </div>
      </div>
    ),
  });
}
