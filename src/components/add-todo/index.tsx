import React, { KeyboardEvent, useContext, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Box, TextField, CardContent } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AuthContext } from '../../providers/auth';
import { TodoCard } from '../todo-card';

export const AddTodo = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (text) {
        addDoc(collection(db, 'todos'), {
          title: text,
          isCompleted: false,
          userId: user?.uid,
          userName: user?.displayName,
        });
        setText('');
      }
    }
  };

  return (
    <TodoCard>
      <CardContent
        sx={{
          p: 0,
          pl: 3,
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
          '& .MuiInput-underline:after': { borderBottom: 'none' },
          '& .MuiInput-underline:before': { borderBottom: 'none' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <RadioButtonUncheckedIcon
            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
          />
          <TextField
            id="input-with-sx"
            fullWidth
            label="Criar nova tarefa"
            variant="standard"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Pressione Enter para cadastrar"
          />
        </Box>
      </CardContent>
    </TodoCard>
  );
};
