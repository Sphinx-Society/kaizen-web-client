import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';
import ExamsManagement from '../components/pages/ExamsManagement/ExamsManagement';
import ExamCreator from '../components/pages/ExamCreator/ExamCreator';
import ExamEditor from '../components/pages/ExamEditor/ExamEditor';

export const templateManagement = () => '/exams-management';
export const createTemplate = () => '/exams-management/create';
export const editTemplate = (id) => `/exams-management/${id}`;
export const login = () => '/';

export default [
  {
    path: login(),
    component: Login,
    exact: true,
  },
  {
    path: templateManagement(),
    component: ExamsManagement,
    exact: true,
  },
  {
    path: createTemplate(),
    component: ExamCreator,
    exact: true,
  },
  {
    path: editTemplate(':id'),
    component: ExamEditor,
    exact: true,
  },
  {
    path: null,
    component: NotFound,
    exact: false,
  },
];

