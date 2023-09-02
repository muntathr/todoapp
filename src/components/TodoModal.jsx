import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [color, setColor] = useState('#dfe6e9');

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            color,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: 35, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <span className='mx-3'></span>
              <label htmlFor="type" >
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              {type == 'add' &&
                <>
                  <label htmlFor="color">
                    Color
                  </label>
                  <span className='d-flex justify-content-between'>
                    <a onClick={() => setColor('#dfe6e9')} className={styles.buttonColor} style={{ backgroundColor: '#dfe6e9', borderStyle: color == '#dfe6e9' && 'solid' }}></a>
                    <a onClick={() => setColor('#f39c12')} className={styles.buttonColor} style={{ backgroundColor: '#f39c12', borderStyle: color == '#f39c12' && 'solid' }}></a>
                    <a onClick={() => setColor('#a29bfe')} className={styles.buttonColor} style={{ backgroundColor: '#a29bfe', borderStyle: color == '#a29bfe' && 'solid' }}></a>
                    <a onClick={() => setColor('#fab1a0')} className={styles.buttonColor} style={{ backgroundColor: '#fab1a0', borderStyle: color == '#fab1a0' && 'solid' }}></a>
                    <a onClick={() => setColor('#55efc4')} className={styles.buttonColor} style={{ backgroundColor: '#55efc4', borderStyle: color == '#55efc4' && 'solid' }}></a>
                    <a onClick={() => setColor('#74b9ff')} className={styles.buttonColor} style={{ backgroundColor: '#74b9ff', borderStyle: color == '#74b9ff' && 'solid' }}></a>
                  </span>
                </>
              }
              <div className={styles.buttonContainer}>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
