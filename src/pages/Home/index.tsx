import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { TodoCard } from '../../components/todo-card';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  Radio,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Todo } from '../../models/todo';
import { AddTodo } from '../../components/add-todo';
import { AuthContext } from '../../providers/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CheckIcon, CrossIcon } from '../../icons';

type HomeButtonProps = {
  isActive?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const HomeButton = (props: HomeButtonProps): JSX.Element => {
  const { isActive = false } = props;
  return (
    <Button
      sx={{ color: isActive ? 'info.light' : 'text.secondary' }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

enum FilterState {
  ALL = 'Todos',
  ACTIVE = 'Ativos',
  COMPLETED = 'Finalizados',
}

export const Home = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterState>(
    FilterState.ALL
  );
  const isSmallScreen = useMediaQuery('(max-width:375px)');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'todos'));

      const subscribeToTodos = () => {
        return onSnapshot(q, querySnapshot => {
          const todos: Todo[] = [];
          querySnapshot.forEach(doc => {
            const todoItem = {
              id: doc.id,
              ...doc.data(),
            };
            todos.push(todoItem as Todo);
          });
          setTodos(todos);
        });
      };

      const unsub = subscribeToTodos();

      return unsub;
    }
  }, [user]);

  const handleRadioCheck = (todo: Todo): void => {
    if (todo.id) {
      const docReference = doc(db, 'todos', todo.id);
      updateDoc(docReference, {
        isCompleted: true,
      });
    }
  };

  const deleteTodo = (todo: Todo): void => {
    if (todo.id) {
      deleteDoc(doc(db, 'todos', todo.id));
    }
  };

  const activeTodos = todos?.filter(todo => !todo.isCompleted) ?? [];
  const completedTodos = todos?.filter(todo => todo.isCompleted) ?? [];
  const filteredTodos =
    activeFilter === FilterState.ALL
      ? todos
      : todos?.filter(todo => {
          const filteredCondition =
            activeFilter === FilterState.ACTIVE ? false : true;
          return todo.isCompleted === filteredCondition;
        });

  const clearCompleted = () => {
    completedTodos.forEach(deleteTodo);
  };

  const todoItems = filteredTodos?.map((todo: Todo) => (
    <ListItem
      disablePadding
      sx={{
        p: 0,
        m: 0,
        borderBottom: '1px solid #dfdfdf',
        '& .delete-icon': {
          visibility: 'hidden',
        },
        '&:hover .delete-icon': {
          visibility: 'visible',
        },
      }}
    >
      <ListItemButton>
        {todo.isCompleted ? (
          <CheckIcon />
        ) : (
          <Tooltip title="Marcar como finalizado">
            <Radio
              checked={false}
              onChange={() => handleRadioCheck(todo)}
              inputProps={{ 'aria-label': todo.title }}
            />
          </Tooltip>
        )}
        <ListItemText>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box
              sx={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
              }}
              component="span"
            >
              {todo.title}
              <p style={{ fontSize: '11px' }}>{todo.userName}</p>
            </Box>

            <IconButton
              className="delete-icon"
              onClick={() => deleteTodo(todo)}
            >
              <CrossIcon />
            </IconButton>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div>
      <AddTodo />
      <TodoCard>
        <CardContent sx={{ p: 0 }}>
          <List>{todoItems}</List>
        </CardContent>
        <CardActions>
          <Grid container alignItems={'center'} justifyContent="space-between">
            <Box component="span">{activeTodos?.length} itens restantes</Box>
            {!isSmallScreen && (
              <Box sx={{ display: 'flex' }}>
                <HomeButton
                  isActive={activeFilter === FilterState.ALL}
                  onClick={() => setActiveFilter(FilterState.ALL)}
                >
                  Todos
                </HomeButton>
                <HomeButton
                  isActive={activeFilter === FilterState.ACTIVE}
                  onClick={() => setActiveFilter(FilterState.ACTIVE)}
                >
                  Ativos
                </HomeButton>
                <HomeButton
                  isActive={activeFilter === FilterState.COMPLETED}
                  onClick={() => setActiveFilter(FilterState.COMPLETED)}
                >
                  Finalizados
                </HomeButton>
              </Box>
            )}
            <Box>
              <HomeButton onClick={clearCompleted}>
                Limpar finalizadas
              </HomeButton>
            </Box>
          </Grid>
        </CardActions>
      </TodoCard>
      {isSmallScreen && (
        <TodoCard>
          <CardContent>
            <HomeButton
              isActive={activeFilter === FilterState.ALL}
              onClick={() => setActiveFilter(FilterState.ALL)}
            >
              All
            </HomeButton>
            <HomeButton
              isActive={activeFilter === FilterState.ACTIVE}
              onClick={() => setActiveFilter(FilterState.ACTIVE)}
            >
              Active
            </HomeButton>
            <HomeButton
              isActive={activeFilter === FilterState.COMPLETED}
              onClick={() => setActiveFilter(FilterState.COMPLETED)}
            >
              Completed
            </HomeButton>
          </CardContent>
        </TodoCard>
      )}
    </div>
  );
};
