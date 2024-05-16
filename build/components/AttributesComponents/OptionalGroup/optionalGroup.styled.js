"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButton = exports.ClickableArea = exports.RadioButtonTitle = exports.ClosedAttributes = exports.AttributesWrapper = exports.OpenedAttributes = exports.OptionalGroupWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.OptionalGroupWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
exports.OpenedAttributes = styled_components_1.default.div(({ open, disabled }) => ({
    padding: '18px 20px',
    border: '1px solid #e6e6e6',
    borderRadius: open ? '20px' : '100px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-radius 0.3s linear',
    textDecoration: disabled ? 'line-through' : 'none',
}));
exports.AttributesWrapper = styled_components_1.default.div(({ open }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    /* height: 100%; */
    maxHeight: open ? '50vh' : '0',
    marginTop: open ? '20px' : '0',
    opacity: open ? '1' : '0',
    overflowY: open ? 'auto' : 'hidden',
    transition: 'max-height 0.2s ease-in-out, margin-top 0.3s ease-in-out, opacity 0.3s ease-in-out',
}));
exports.ClosedAttributes = styled_components_1.default.div `
  padding: 18px 20px;
  border: 1px solid #e6e6e6;
  border-radius: 100px;
`;
exports.RadioButtonTitle = styled_components_1.default.span `
  font-size: 13px;
  font-weight: 500;
`;
exports.ClickableArea = styled_components_1.default.div `
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
exports.RadioButton = styled_components_1.default.img `
  width: 15px;
`;
