import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';
import TemplatesManagement from '../components/pages/TemplatesManagement/TemplatesManagement';
import TemplateEditor from '../components/pages/TemplateEditor/TemplateEditor';

import {
  login,
  templatesManagement,
  templateEditor,
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
    path: null,
    component: NotFound,
    exact: false,
  },
];

