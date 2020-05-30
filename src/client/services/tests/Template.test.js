import Template from '../Template';

const setUp = () => {
  document.cookie = 'token=1';
};

describe('Template Service', () => {
  beforeEach(() => setUp());

  test('Attributes', () => {
    const TemplateService = new Template();
    expect(TemplateService.baseUrl).toEqual(`${TemplateService.apiUrl}/templates`);
  });

  test('Methods', () => {
    const TemplateService = new Template();
    expect(typeof TemplateService.listTemplates).toEqual('function');
    expect(typeof TemplateService.createTemplate).toEqual('function');
    expect(typeof TemplateService.deleteTemplate).toEqual('function');
    expect(typeof TemplateService.editTemplate).toEqual('function');
  });
});
