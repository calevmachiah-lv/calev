import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsChina } from '../../store/threekitSlicer';
import { PAGES_TITLES } from '../../utils/constants';

interface IPageTitle {
  page: string;
}

function usePageTitle({ page }: IPageTitle) {
  const isChina = useSelector(getIsChina);
  useEffect(() => {
    const title = isChina ? PAGES_TITLES[page]?.zh : PAGES_TITLES[page]?.en;
    if (title) document.title = title;
  }, [page, isChina]);
}

export default usePageTitle;
