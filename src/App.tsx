import React, { FC, useEffect, useMemo, useState } from 'react';
import Router from './router/Router';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import useWindowSize from './utils/threekitHooks/useWindowSize';
import { launch, setIsChina } from './store/threekitSlicer';
import useParams from './hooks/useParams';
import { AwaitPlayerLoad } from './components';
import { setGlobalSettingsParams } from './store/globalSettingsSlicer';
import { getParams } from './utils/function/navigationParams';
import { isRightToLeft } from './utils/function/functions';
import { waitForDataDrivenExtensionConfigurator } from './utils/function/dataDrivenFn';

const App: FC<any> = () => {
  const { isIpad, isDesktop, isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const params = getParams();
  const { sku, appName = 'catalogios' } = params || {};
  window.dataDrivenConfiguratorInitialSku = sku;
  const memoizedAppName = useMemo(() => appName.toLowerCase(), [appName]);
  const { newParams: config, isChina, isLoading, error } = useParams();

  const [isDataDrivenReady, setIsDataDrivenReady] = useState(false);
  const dataDrivenReady = async () =>
    await waitForDataDrivenExtensionConfigurator();

  useEffect(() => {
    dataDrivenReady();
    setIsDataDrivenReady(true);
  }, []);

  useEffect(() => {
    if (!isDataDrivenReady || isLoading || error) return;
    dispatch(setIsChina(isChina));
    dispatch(setGlobalSettingsParams(params));
    dispatch<any>(launch(config));
  }, [dispatch, isDataDrivenReady, config, isChina, isLoading, error]);

  useEffect(() => {
    const isRtl = isRightToLeft();
    const dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, [params.lng]);

  const theme = {
    device: { isIpad, isDesktop, isMobile },
    appName: memoizedAppName,
  };

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ margin: '20px' }}>{error}</div>
      </ThemeProvider>
    );
  }

  if (isLoading || !isDataDrivenReady) {
    return (
      <ThemeProvider theme={theme}>
        <AwaitPlayerLoad />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AwaitPlayerLoad>
        <Router />
      </AwaitPlayerLoad>
    </ThemeProvider>
  );
};

export default App;
