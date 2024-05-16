import {
  TooltipContent,
  TooltipHeader,
  TooltipImage,
  TooltipText,
  TooltipTitle,
  TooltipArrow,
  TooltipWrapper,
} from './tooltip.styles';

interface ToolTipProps {
  show: boolean;
  title?: string;
  text?: string;
  backgroudToDisplay?: string;
  id: string;
}

function ToolTip({ show, title, text, backgroudToDisplay, id }: ToolTipProps) {
  return (
    <TooltipWrapper show={show} id={`tooltip-${id}`}>
      <TooltipContent>
        <TooltipHeader>
          {backgroudToDisplay && <TooltipImage src={backgroudToDisplay} />}
          {title && <TooltipTitle>{title}</TooltipTitle>}
        </TooltipHeader>
        {text && <TooltipText>{text}</TooltipText>}
      </TooltipContent>
      <TooltipArrow id={`tooltipArrow-${id}`} />
    </TooltipWrapper>
  );
}

export default ToolTip;
