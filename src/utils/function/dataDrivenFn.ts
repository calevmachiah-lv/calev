export const waitForDataDrivenConfigurator = async (): Promise<void> => {
  while (
    !window.dataDrivenConfigurator ||
    !window.dataDrivenConfigurator?.isInited ||
    !window?.dataDrivenConfiguratorExtension ||
    !window?.dataDrivenConfiguratorExtension?.getStatus
  ) {
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await wait(10);
  }
};

export const waitForDataDrivenExtensionConfigurator =
  async (): Promise<void> => {
    while (
      !window.dataDrivenConfiguratorExtension ||
      !window.dataDrivenConfiguratorExtension?.isInited
    ) {
      const wait = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await wait(10);
    }
  };
