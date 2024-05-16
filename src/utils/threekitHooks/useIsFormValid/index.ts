import { useSelector } from 'react-redux';
import { getForm } from '../../../store/threekitSlicer';

function useIsFormValid() {
  const form = useSelector(getForm);
  return form;
}

export default useIsFormValid;
