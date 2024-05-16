import { useSelector } from 'react-redux';
import { isThreekitLoaded } from '../../../store/threekitSlicer';

const useThreekitInitStatus = () => useSelector(isThreekitLoaded);

export default useThreekitInitStatus;
