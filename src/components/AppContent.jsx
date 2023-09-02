import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import Lottie from "lottie-web";
import anim_nodata from "../assets/animation/no-data.json";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  useEffect(() => {
    Lottie.loadAnimation({
      container: document.getElementById('anim_nodata'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: anim_nodata
    })
  }, []);

  useEffect(() => {
    console.log('filteredTodoList', filteredTodoList)
  }, [filteredTodoList])

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
    <h1 className={styles.titleHeader}>My Task</h1>
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          <div className='row'>
            {
              filteredTodoList.map((todo) => (
                <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                  <TodoItem key={todo.id} todo={todo} />
                </div>
              ))
            }
          </div>

        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            <span id='anim_nodata' className={styles.animNoData}></span>
            <h2>No Todos</h2>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
