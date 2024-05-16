import { Container } from './SummaryForm.style';
import SummaryCarousel from './Carousel/SummaryCarousel';
import { useSelector } from 'react-redux';
import { getForm } from '../../store/threekitSlicer';

const isSLider = true;

const Form = () => {
  const formData = useSelector(getForm);
  if (!formData) return null;
  return (
    <Container>
      {formData && isSLider ? (
        <SummaryCarousel config={formData}></SummaryCarousel>
      ) : null}
    </Container>
  );
};

export default Form;
