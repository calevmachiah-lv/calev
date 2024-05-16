import { useSelector } from 'react-redux';
import { isPlayerLoading } from '../../../store/threekitSlicer';

const usePlayerLoadingStatus = () => useSelector(isPlayerLoading);

export default usePlayerLoadingStatus;
