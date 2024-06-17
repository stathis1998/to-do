export type MainProps = {
  children?: React.ReactNode;
};

export function Main(props: MainProps) {
  const { children } = props;
  return <main className="container mx-auto p-4">{children}</main>;
}
