const StudentsMainLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div>
      <h1>Students Page</h1>
      {children}
    </div>
  );
};

export default StudentsMainLayout;
