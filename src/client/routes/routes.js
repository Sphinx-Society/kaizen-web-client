import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';
import TemplatesManagement from '../components/pages/TemplatesManagement/TemplatesManagement';
import TemplateEditor from '../components/pages/TemplateEditor/TemplateEditor';
import UsersManagement from '../components/pages/UsersManagement/UsersManagement';
import UserProfile from '../components/pages/UserProfile/UserProfile';
import ExamsHistory from '../components/pages/ExamsHistory/ExamsHistory';
import Settings from '../components/pages/Settings/Settings';

import {
  login,
  templatesManagement,
  templateEditor,
  usersManagement,
  userProfile,
  examsHistory,
  settings,
} from './paths';

export default [
  {
    path: login(),
    component: Login,
    exact: true,
  },
  {
    path: templatesManagement(),
    component: TemplatesManagement,
    exact: true,
  },
  {
    path: templateEditor(),
    component: TemplateEditor,
    exact: true,
  },
  {
    path: usersManagement(),
    component: UsersManagement,
    exact: true,
  },
  {
    path: examsHistory(),
    component: ExamsHistory,
    exact: true,
  },
  {
    path: settings(),
    component: Settings,
    exact: true,
  },
  {
    path: userProfile(),
    component: UserProfile,
    exact: true,
  },
  {
    path: null,
    component: NotFound,
    exact: false,
  },

];

