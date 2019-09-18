
import TaskInfo from './components/TaskInfo/TaskInfo';
import Home from './components/Home/Home';

export const routes = [
   {path: '/', name: 'Home', component: Home},
  { path: '/task/:id', name: 'TaskInfo', component: TaskInfo, props: true},
];
