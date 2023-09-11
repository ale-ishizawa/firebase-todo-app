import React, { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';

type TodoCardProps = {
  children: ReactNode;
};

export const TodoCard = ({
  children,
  ...props
}: TodoCardProps): JSX.Element => {
  return (
    <Card
      {...props}
      sx={[
        { mt: 2 },
        theme => ({
          backgroundColor:
            theme.palette.mode === 'dark' ? 'primary.main' : 'background.paper',
        }),
      ]}
    >
      {children}
    </Card>
  );
};
