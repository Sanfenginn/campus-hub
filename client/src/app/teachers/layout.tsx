const TeachersMainLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div>
      <h1>Teachers Page</h1>
      {children}
    </div>
  );
};

export default TeachersMainLayout;
