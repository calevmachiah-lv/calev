interface Node {
  name: string;
}

export const findHitNode = (
  hitNodes: { hierarchy: Node[] }[],
  name: string | RegExp | undefined
): Node | undefined => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find((el) =>
      typeof name === 'string' ? name === el.name : name?.test(el.name)
    ) || undefined
  );
};
