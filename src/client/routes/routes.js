import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login/Login';
import TemplatesManagement from '../components/pages/TemplatesManagement/TemplatesManagement';
import TemplateCreator from '../components/pages/TemplateCreator/TemplateCreator';
import TemplateEditor from '../components/pages/TemplateEditor/TemplateEditor';

import {
  login,
  templatesManagement,
  templateCreator,
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
    path: templateCreator(),
    component: TemplateCreator,
    exact: true,
  },
  {
    path: templateEditor(':id'),
    component: TemplateEditor,
    exact: true,
  },
  {
    path: null,
    component: NotFound,
    exact: false,
  },
];

