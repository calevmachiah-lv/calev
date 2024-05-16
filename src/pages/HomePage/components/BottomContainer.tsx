import AttributeValues from '../../../components/AttributeValues';
import { AttributeValuesContainer } from '../../../components/AttributeValues/attributeValues.styles';
import useActiveAttribute from '../../../hooks/useActiveAttribute';
import { BottomFormContainer, ValuesContainer } from './landscapeForm.styles';

interface BottomContainerProps {
  attribute: any;
  attributes: any;
}
const BottomContainer: React.FC<BottomContainerProps> = (props) => {
  const { attribute, attributes } = props;
  const { activeAttribute, selectedValues } = useActiveAttribute();
  return (
    <ValuesContainer
      key={attribute.name}
      
      style={{
        opacity: activeAttribute === attribute.name ? '1' : '0',
        zIndex: activeAttribute === attribute.name ? '1' : '-1',
        transform:
          activeAttribute === attribute.name
            ? 'translateY(0)'
            : 'translateY(100%)',
      }}
    >
        
        <AttributeValues
          attributeNames={attributes.map((attribute: any) => attribute.name)}
          selectedValues={selectedValues}
        />
    </ValuesContainer>
  );
};

export default BottomContainer;
